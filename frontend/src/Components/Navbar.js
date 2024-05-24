import { SpeedDial, SpeedDialAction, styled } from '@mui/material';
import { AccountDetails, Cart, Controller, Home, LightbulbOn } from 'mdi-material-ui';
import React from 'react';
import theme from '../styles/theme';
import { Add } from '@mui/icons-material';


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    height: '75px',
    left: '5%'
}));

const CircleIcon = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: theme.palette.color3.main,
    '&:hover': {
        backgroundColor: theme.palette.color3.dark,
        '& .rotate-icon': { // Sélectionne l'icône avec la classe 'rotate-icon'
            transform: 'rotate(45deg)', // Fait tourner l'icône de 90 degrés lorsqu'on survole la div
        },
    },
}));

const RotateIcon = styled(Add)(({ theme }) => ({
    transition: 'transform 0.3s ease', // Ajoute une transition pour une animation fluide de la rotation
}));

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleNavigation = (url) => {
        // Naviguer vers l'URL spécifiée
        window.location.href = url;
    };

    return (
        <StyledSpeedDial theme={theme}
            ariaLabel="SpeedDial controlled open example"
            icon={<CircleIcon theme={theme} ><RotateIcon className='rotate-icon' /></CircleIcon>}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction='right'
            color='color2'
        >

            <SpeedDialAction
                key={'Home'}
                icon={<Home />}
                tooltipTitle={<span style={{ position: 'relative', zIndex: '9999' }}>Home</span>}
                onClick={() => {
                    // Appeler la fonction de navigation avec l'URL de la nouvelle page
                    handleNavigation('/Home');
                }}
            />
            <SpeedDialAction
                key={'Game'}
                icon={<Controller />}
                tooltipTitle={'Game'}
                onClick={() => {
                    // Appeler la fonction de navigation avec l'URL de la nouvelle page
                    handleNavigation('/Game');
                }}
            />
            <SpeedDialAction
                key={'Concept'}
                icon={<LightbulbOn />}
                tooltipTitle={'Concept'}
                onClick={() => {
                    // Appeler la fonction de navigation avec l'URL de la nouvelle page
                    handleNavigation('/Concept');
                }}
            />
            <SpeedDialAction
                key={'Profil'}
                icon={<AccountDetails />}
                tooltipTitle={'Profil'}
                onClick={() => {
                    // Appeler la fonction de navigation avec l'URL de la nouvelle page
                    handleNavigation('/Profil');
                }}
            />
            <SpeedDialAction
                key={'Cart'}
                icon={<Cart />}
                tooltipTitle={'Cart'}
                onClick={() => {
                    // Appeler la fonction de navigation avec l'URL de la nouvelle page
                    handleNavigation('/Cart');
                }}
            />

        </StyledSpeedDial>
    );
};

export default Navbar;