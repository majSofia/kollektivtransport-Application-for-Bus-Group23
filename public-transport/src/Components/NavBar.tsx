import  { useState } from 'react';

interface NavbarProps {
  userName?: string;
  onLogout?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToSearch?: () => void;
}

export default function Navbar({ userName, onLogout, onNavigateToHome, onNavigateToSearch }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
   return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Create burger meny */}
          <button 
            className="burger-menu" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>



          {/* våres firma navn*/}
          <h1 className="company-name">Kudo Transport</h1>
        </div>
      </nav>

      
      {menuOpen && (
        <div className="mobile-menu">
          {userName && (
            <div className="menu-user-info">
              Welcome, {userName}!
            </div>
          )}
          
          {onNavigateToHome && (
            <a onClick={() => {
              onNavigateToHome();
              setMenuOpen(false);
            }}> Home</a>
          )}
          
          {onNavigateToSearch && (
            <a onClick={() => {
              onNavigateToSearch();
              setMenuOpen(false);
            }}> Search Travel</a>
          )}
          
          

          {onLogout && (
            <button className="menu-logout" onClick={onLogout}>
               Log out
            </button>
          )}
        </div>
      )}
    </>
  );
}