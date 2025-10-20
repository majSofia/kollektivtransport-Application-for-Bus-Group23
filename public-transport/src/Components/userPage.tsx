import React, { useState } from 'react';
import { emailExists, addUser } from './virtualDataBase';

interface CreateNewUserProps {
  onBackToLogin: () => void;
}
   // vi lager fem variabler for å lage ny bruker :
   // name, email, passowrd, confirm password osv.

const CreateNewUser: React.FC<CreateNewUserProps> = ({ onBackToLogin }) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCreateUser = () => {
    setError('');
   //  if statement for å sjekke at alle feltene er fylt ut, hvis ikke 
   // feil melding.
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields must be filled out");
      return;
    }
   //  if statement for å sjekke om at passordet er likte
    if (password !== confirmPassword) {
      setError("Passwords don’t match!");
      return;
    }
   //  if statement for å sjekke om at passord er større en 6 characters
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

   // if-statement at e-posten allerede finnes i databasen
    if (emailExists(email)) {
      setError("This email is already registered");
      return;
    }

    // om det er alt ok, lag nu user, og legg den user i database
    const newUser = addUser(fullName, email, password);
    console.log("New user created:", newUser);
    
    alert(`Your account is created, ${fullName}! 🎉\nYou can now log in.`);
    
    
    onBackToLogin();
  };

  return (
    <div className="page-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Complete the information below to get started</p>
          </div>

          <div className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="fullName">FullName</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Kudo Sofia"
              />
            </div>

            <div className="form-group">
              <label htmlFor="createEmail">E-mail</label>
              <input
                type="email"
                id="createEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Kudo@mail.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="createPassword">Password</label>
              <input
                type="password"
                id="createPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
              />
            </div>

            <button onClick={handleCreateUser} className="btn btn-primary">
              Create Account
            </button>

            <div className="auth-footer">
              <p>Do you already have an account?</p>
              <button onClick={onBackToLogin} className="btn btn-link">
                Login here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewUser;