import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { request } from "@/utils/request";
import { Snackbar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';

import { useTranslation } from "react-i18next";

import LanguageSelector from "../../components/language-selector.jsx";

const LoginPage = () => {

  const { t } = useTranslation()

  const { saveToken } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: false, password: false });
  const [alert, setAlert] = useState({ type: '', message: '', open: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = { username: !username, password: !password };
    setErrors(newErrors);
    if (!username || !password) {
      return;
    }

    try {
      const response = await request.post("/login", { username, password });
      const { token } = response.data;
      saveToken(token);
      setAlert({ type: 'success', message: t('Login unsuccess!'), open: true });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, open: false }));
        navigate("/");
      }, 3000); // Close the alert after 3 seconds and navigate
      // alert("Login success!");
      navigate("/");
    } catch (error) {
      setAlert({ type: 'error', message: t('Login unsuccess!'), open: true });
      setTimeout(() => setAlert((prev) => ({ ...prev, open: false })), 3000); // Close the alert after 3 seconds
      // alert("Login unsuccess!");
    }
  }
  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Box sx={{ position: 'absolute', top: '2px', right: '2px' }}>
        <LanguageSelector />
      </Box>

      <Container component="main" maxWidth="xs"
        sx={{
          padding: '40px 20px',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          borderRadius: '12px',
          backgroundColor: 'white',
          minWidth: '520px'
        }}
      >

        <CssBaseline />
        <Box
          sx={{

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"
            sx={{
              fontWeight: '700',
            }}
          >
            {t('Login')}
          </Typography>
          <Snackbar
            open={alert.open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
          >
            <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={t('Username')}
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onClick={() => {
                setErrors({
                  username: false,
                  password: false
                })
              }}
              error={errors.username}
              helperText={errors.username && t('Enter username')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('Password')}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => {
                setErrors({
                  username: false,
                  password: false
                })
              }}
              error={errors.password}
              helperText={errors.password && t('Enter password')}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('Sign In')}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2" >
                  {t('Forgot password?')}
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2" >
                  {t("Don't have an account? Sign Up")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
