import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { setToken, signInApi } from '../Services/auth.services';
import AuthState from '../auth/Authcontext';

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { setIsLoggedIn, isLoggedIn, checkLoggedInStatus, navigate } = useContext(AuthState);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    useEffect(() => {
        checkLoggedInStatus()
    }, [checkLoggedInStatus])

    const handleSignIn = async () => {
        try {
            const token = await setToken(formData)
            const response = await signInApi(formData)
            if (response.isSuccess) {
                localStorage.setItem('token', token)
                setIsLoggedIn(true)
                console.log('Signin Successful:', response)
                navigate('/chatpage')
            }
        } catch (error) {
            console.error('Signin Error:', error)
        }
    };

    return (
        <div className="fullscreen">
            <div className="containersign">
                <Box className="box-frame">
                    <p>Sign In</p>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="email">
                            <TextField
                                required
                                id="outlined-required"
                                label="Email-Id"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </FormControl>
                        </div>
                    </Box>
                    <Stack spacing={2} direction="row" justifyContent="center" className="btnsignin">
                        <Button variant="contained" onClick={handleSignIn}>
                            Sign In
                        </Button>
                    </Stack>
                    <Stack spacing={0} direction="row" className="changecomponentbtn">
                        <p className="txt">Don't have an account?</p>
                        <Link className="changetosignup" to="/signup" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
                            Sign Up
                        </Link>
                    </Stack>
                </Box>
            </div>
        </div>
    );
};

export default Signin;
