import React, { useState } from 'react';
// På den kodelinje henter vi info fra vår virtuelle database
import { validateLogin, debugShowAllUsers } from './virtualDataBase';
// vi har lagt en funksjonstype, difenere vi interface for å vise hvilken 
// props et objekt skal ha, så på denne vi sender inn til login komponenten.
interface LoginProps {
  onCreateAccount: () => void;
}

const Login: React.FC<LoginProps> = ({ onCreateAccount }) => {
  // vi lager tre variable for å holde på e-post, passord, og feilmelding.
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
 // Denne funksjonen kjører nå man vil login (trykker på login knapp)
  const handleLogin = () => {
    setError('');
 // if-statement for å sjekke om e-post eller passord mangler noe, sjekk av epost/pw
 // om det er noen feil kommer en feilmelding (setError)
    if (!email || !password) {
      setError("Please complete all fields");
      return;
    }

    // sjekk om users finnes i databasen
    const user = validateLogin(email, password);
   // if statement for å sjekke at user finnes i databasen, så hvis ja 
   // gir user velkommen melding.
   // hvis ikke finnes, gir user feilmelding
    if (user) {
      alert(`Welcome, ${user.fullName}! 🎉`);
      console.log("Signed-in user:", user);
    } else {
      setError("User not found");
    }
  };

  // Denne funksjonen viser alle testbrukere i konsollen 
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