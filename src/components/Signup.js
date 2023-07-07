import React, { useContext, useState } from 'react';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useSignupFormik from '../FormikValidation/Signup.validation';
import { signUpApi } from '../Services/auth.services';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignUp = async (values) => {
        try {
            const response = await signUpApi(values);
            if (response.status === 200) {
                console.log('Signup Successful:', response);
            }
        } catch (error) {
            console.error('Signup Error:', error);
        }
    };

    const formik = useSignupFormik(handleSignUp);


    return (
        <div className="fullscreen">
            <div className="containersignup">
                <Box className="box-frame-signup">
                    <p>Sign Up</p>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="name">
                            <TextField
                                required
                                id="outlined-required"
                                label="Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && formik.errors.name}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </div>
                        <div className="gender">
                            <FormControl required sx={{ m: 1, width: '25ch' }}>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="gender-select"
                                    value={formik.values.gender}
                                    name="gender"
                                    onChange={formik.handleChange}
                                    error={formik.touched.gender && formik.errors.gender}
                                    helperText={formik.touched.gender && formik.errors.gender}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="email">
                            <TextField
                                required
                                id="outlined-required"
                                label="Email-Id"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && formik.errors.email}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </div>
                        <div className="password">
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
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && formik.errors.password}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </FormControl>
                        </div>
                        <div className="contactNumber">
                            <TextField
                                required
                                id="outlined-required"
                                label="Contact Number"
                                name="contactNumber"
                                value={formik.values.contactNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.contactNumber && formik.errors.contactNumber}
                                helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                            />
                        </div>
                        <Stack spacing={2} direction="row" justifyContent="center" className="btnsignin">
                            <Button variant="contained" type="submit">
                                Sign Up
                            </Button>
                        </Stack>
                        <Stack spacing={0} direction="row" className="changecomponentbtn">
                            <p className="txt">Already have an account?</p>
                            <Link
                                className="changetosignin"
                                to="/"
                                style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                            >
                                Sign In
                            </Link>
                        </Stack>
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default Signup;


