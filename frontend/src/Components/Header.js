import React from 'react';
import Navbar from './Navbar';
import theme from '../styles/theme';
import { ThemeProvider } from '@mui/material';
import ConnexionButton from './ConnexionButton';

const Header = () => {

    const handleNavigation = (url) => {
        // Naviguer vers l'URL spécifiée
        window.location.href = url;
    };

    return (
        <ThemeProvider theme={theme}>
            <div className='Header' style={{ height: '87.5px', background: 'rgba(255, 255, 255, 0.9)', position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1000' }}>
                <Navbar />
                <ConnexionButton />
                <img src="/img/logoArocse.png" alt="LOGO" style={{ height: '60px', marginTop: '10px' }} onClick={() => { handleNavigation('/Home'); }} />
                <hr style={{ border: 'none', borderBottom: '1px solid #e0e0e0', width: '100%', marginTop: '-15px' }} />
            </div>
        </ThemeProvider>
    );
};

export default Header;