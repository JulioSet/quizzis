import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('username', username);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p htmlFor="username">Username</p>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div> <br></br>
        <button type="submit">Play</button>
      </form>
    </div>
  );
};

export default Login;
