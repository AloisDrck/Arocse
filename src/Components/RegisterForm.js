import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AccountCircleTwoTone, AlternateEmailRounded, LockTwoTone } from '@mui/icons-material';
import { Box, Button, Paper, Stack, TextField, styled } from '@mui/material';
import axios from 'axios';
import theme from '../styles/theme';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    width: '300px',
    alignItems: 'center',
    borderRadius: '20px'
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.color3.main,
    '&:hover': {
        backgroundColor: theme.palette.color3.dark,
    }
}));

const validationSchema = Yup.object({
    name: Yup.string().required('Prénom est requis'),
    email: Yup.string().email('Email invalide').required('Email est requis'),
    password: Yup.string().min(6, 'Mot de passe doit contenir au moins 6 caractères').required('Mot de passe est requis')
});

const RegisterForm = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.post('http://localhost:3000/api/user/register', values, { withCredentials: true })
                .then(response => {
                    console.log('Nouveau client créé');
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });

    return (
        <div style={{ marginTop: '100px', position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <form onSubmit={formik.handleSubmit}>
                <Item elevation={24}>
                    <Stack spacing={3} alignItems={'center'}>
                        <h2 style={{ paddingTop: '20px' }}>Inscription</h2>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircleTwoTone sx={{ color: '#F45050', mr: 1, my: 0.5 }} />
                            <TextField
                                id="name"
                                name="name"
                                label="Prénom"
                                variant="standard"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AlternateEmailRounded sx={{ color: '#F45050', mr: 1, my: 0.5 }} />
                            <TextField
                                id="email"
                                name="email"
                                label="E-mail"
                                variant="standard"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LockTwoTone sx={{ color: '#F45050', mr: 1, my: 0.5 }} />
                            <TextField
                                id="password"
                                name="password"
                                label="Mot de passe"
                                variant="standard"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Box>
                        <SubmitButton theme={theme} variant="contained" style={{ marginBottom: '35px', marginTop: '35px' }} type='submit'>
                            S'inscrire
                        </SubmitButton>
                    </Stack>
                </Item>
            </form>
        </div>
    );
};

export default RegisterForm;
