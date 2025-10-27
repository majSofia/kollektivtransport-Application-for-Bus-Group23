import React, { useState } from 'react';
import { validateLogin, debugShowAllUsers, saveCurrentUser } from './virtualDataBase';

interface LoginProps {
  onCreateAccount: () => void;
  onLoginSuccess: (userName: string) => void;
}

const Login: React.FC<LoginProps> = ({ onCreateAccount, onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = () => {
    setError('');

    if (!email || !password) {
      setError("Please complete all fields");
      return;
    }

    const user = validateLogin(email, password);
    if (user) {
      // Lagre bruker i localStorage
      saveCurrentUser(user);
      
      onLoginSuccess(user.fullName);
    } else {
      setError("User not found");
    }
  };

  const showDummyUsers = () => {
    debugShowAllUsers();
    alert("Check the console to see all dummy users!");
  };

  return (
    <div className="page-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome to Kudo Transport</h1>
            <p>Login by your account</p>
          </div>

          <div className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Kudo@mail.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
              />
            </div>

            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>

            <div className="auth-footer">
              <p>Do you not have an account?</p>
              <button onClick={onCreateAccount} className="btn btn-link">
                Create New User
              </button>
             
              <button onClick={showDummyUsers} className="btn btn-debug">
                Show dummy users
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;