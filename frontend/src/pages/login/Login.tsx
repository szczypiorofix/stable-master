import React, { useState } from 'react';
import { Alert, Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material';

import { getBaseUrl } from '../../config/Environment.config.ts';
import { useGlobalAppContext } from '../../context/AppContext.tsx';
import { APP_VIEW } from '../../shared/enums';

export function Login() {
    const apiUrl = getBaseUrl();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { contextState, setContextState } = useGlobalAppContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error('Nieprawidłowy email lub hasło.');
                }
                throw new Error('Wystąpił problem z połączeniem z serwerem.');
            }

            const data = await response.json();

            // 1. Zapisujemy token JWT w przeglądarce
            localStorage.setItem('jwt_token', data.access_token);

            // 2. Przekierowujemy użytkownika do aplikacji
            // Użyj swojej logiki nawigacji (Context lub React Router)
            // setAppView(APP_VIEW.HOME);

            console.log('Zalogowano pomyślnie!');
            setContextState({
                ...contextState,
                isUserLoggedIn: true,
                view: APP_VIEW.HOME,
            });
        } catch (err: unknown) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
                    <Typography component='h1' variant='h4' align='center' gutterBottom>
                        Stable Master
                    </Typography>
                    <Divider />
                    <Typography component='h2' variant='h5' align='center' pt={4} pb={1} gutterBottom>
                        Log in
                    </Typography>

                    {error && (
                        <Alert severity='error' sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='E-mail'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
