  import React, { useState } from 'react';
  import { emailExists, addUser, saveCurrentUser } from './virtualDataBase';

  // et plan forteller hva komponenten skal få fra utside
  // 1- funksjon uten parameter sender bruker tilbake til login 
  // 2- funksjon med parameter som kjører når registrering er suksses 
  // https://medium.com/nerd-for-tech/choosing-between-type-and-interface-in-react-da1deae677c9
  interface CreateNewUserProps {
    onBackToLogin: () => void;
    onRegisterSuccess: (userName: string) => void;
  }
  // så vi må tenke på de som ikke har account ennå, 
  // derfor lager en variabler for createnewuser med props som definerer at user kan tilbake til loginn
  // eller fortsatt med registreringen (hvilken verdier komponenten mottar)
  //vi skal bruke hooken useState for å lage en state variabler
  // hvorfor trenger vi variabler:
  // Fordi de skal lagre verdiene som brukeren skriver inn i feltene, (navn, e-post, passord, confirmpassord, og error).
  // i tillegg  definerer hvilken datatype for hver variabler, som vi se på name for eksempel har string datatype 
  const CreateNewUser: React.FC<CreateNewUserProps> = ({ onBackToLogin, onRegisterSuccess }) => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

  // når en bruker ænsker å lage en ny konto, må vi tenke på hvilke hendelser som skjer under denne prossesen,
  // og hvordan vi kan håndtere opprettelsen av en ny bruker.
  // 1- Først må vi garantert oss om at brukeren har fylt ut alle felten, hvis betingelsen ikke er oppfylt, skal brukeren få feilmelding at noen felt mangler.
  // 2-  på den passord, og bekreft passord også må vi også skjekke at bruker har skrevet på bekreftet passord felt akkurat samme passord
  // som han har allerde skrevt på passord felt (begge felten må matche passord), hvis ikke gi feilmelding at passord matcher ikke
  // Det samme prinsippet gjelder for de andre (passordlengde, og e-post allerde finnes i database)
  // Så for å oppnå dette, trenger vi en if-setning.
    const handleCreateUser = () => {
      setError('');

      if (!fullName || !email || !password || !confirmPassword) {
        setError("All fields must be filled out");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords don't match!");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      if (emailExists(email)) {
        setError("This email is already registered");
        return;
      }

      // så etter det hvi alt er riktig, trenger vi å lagre bruker i database, til at han kan fortsatt loggin etter det.
      const newUser = addUser(fullName, email, password);
      console.log("New user created:", newUser);
    
      
      saveCurrentUser(newUser);
    
      alert(`Your account is created, ${fullName}! 🎉\nYou are now logged in.`);
    
      // etter at alle prossesen er klar,Sender vi brukeren til home page
      onRegisterSuccess(fullName);
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