import React, { useEffect, useState } from 'react';
import Login from './Login';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
        const jsonData = await response.json();
        setQuestions(jsonData.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNextQuestion = (e) => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (e.target.value === currentQuestion.correct_answer) {
      setCurrentScore(currentScore + 1);
    }
  };

  const currentQuestion = questions && questions[currentQuestionIndex];

  return (
    <div>
      <h2>Trivia Question</h2>
      {localStorage.getItem('isLoggedIn') === null ? (
        <Login />
      ) : loading ? (
        <p>Loading...</p>
      ) : timeLeft === 0 || currentQuestionIndex === 10 ?(
        <div>
          <p>Tang tang tang~ It's over, {localStorage.getItem('username')} :D</p>
          <p>Correct Answer : {currentScore}</p>
          <p>Wrong Answer : {currentQuestionIndex - currentScore}</p>
          <p>Answered : {currentQuestionIndex}</p>
        </div>
      ) : !questions ? (
        <p>No questions available!</p>
      ) : (
        <div>
          <h4>Question : {questions.length} Answered : {currentQuestionIndex}</h4>
          <h4>Score : {currentScore}</h4>
          <h5>Time : {timeLeft}</h5>
          <p>{currentQuestion.question}</p>
          <form>
            {currentQuestion.incorrect_answers.map((answer) => (
              <div>
                <label>
                  <input 
                    type="radio"
                    name="answer"
                    value={answer}
                    checked={false}
                    onClick={handleNextQuestion}
                  />
                  {answer}
                </label>
              </div>
            ))}
            <div>
              <label>
                <input 
                  type="radio"
                  name="answer"
                  value={currentQuestion.correct_answer}
                  checked={false}
                  onClick={handleNextQuestion}
                />
                {currentQuestion.correct_answer}
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
