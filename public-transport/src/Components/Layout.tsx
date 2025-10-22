import React from 'react';
import Navbar from './NavBar';
import Footer from './footer';

interface LayoutProps {
    children: React.ReactNode;
    userName?: string;
    onLogout?: () => void;
    onNavigateToHome?: () => void;
    onNavigateToSearch?: () => void;

}

export default function Layout ({children, userName, onLogout, onNavigateToHome, onNavigateToSearch}
    : LayoutProps
) {
    return(
        <div className='home-page'>
            <Navbar
            userName = {userName}
            onLogout= {onLogout}
            onNavigateToHome= {onNavigateToHome}
            onNavigateToSearch= {onNavigateToSearch}
            />
            <main className='main-content'>
                <div className='content-container'>
                    {children}
                </div>

            </main>
            <Footer/>
        </div>
    );
}
