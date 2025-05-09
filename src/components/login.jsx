import React from 'react';
import './component.css';

const Login = () => {
  return (
    <div className='bodyy'>
    <div className="login-container">
    <form className="login-form">
      <h2>Login</h2>
      <input type="text" placeholder="Username" className="mb-4 p-2 border w-full" />
      <input type="password" placeholder="Password" className="mb-4 p-2 border w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  </div>
  </div>
  );
};

export default Login;