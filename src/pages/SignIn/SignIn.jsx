import React from "react";
import { useState } from "react";
import { Button, Card, Chip, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../fireBaseConfig";
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContextData } from "../../Auth/AuthContext";

const SignIn = () => {
  const { authStatus, setAuth } = useAuthContextData();
  let navigate = useNavigate();
  // const [email , setEmail] = useState("");
  const [error, setError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //sign up with email , pasword states
  const [emailSignUp, setEmailSignUp] = useState("")
  const [passwordSignUp, setPasswordSignUp] = useState("")
  const [errorOccur, setErrorOccur] = useState(false);

  const { isAuth } = authStatus;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateEmail = (emailSignUp) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailSignUp);
  }
  const validatePassword = (passwordSignUp) => {
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return pwdRegex.test(passwordSignUp);
  }

  const handleSignIn = async () => {
    const isValidEmail = validateEmail(emailSignUp)
    const isValidPassword = validatePassword(passwordSignUp)
    if (isValidEmail  && isValidPassword) {
      setError("");
      setPwdError("");
      setErrorOccur("")
      try {
        const email = emailSignUp;
        const password = passwordSignUp;
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        debugger
        setAuth({...user, mode: "EMAIL_LOGIN"});
        setErrorOccur(true)
        navigate("/")
      }

      catch (error) {
        console.log('error:', error);
        setErrorOccur("User Not Found , please sign up first...")
      }
    }
    else {
      setError(!isValidEmail?"invalid Email address": '');
      setPwdError(!isValidPassword? "Password must be of 8 digits & add 1 special character": '');
    }
  }

  const LoginWithGoogle = async () => {
    try {
      const useCredential = await signInWithPopup(auth, provider)
      const user = useCredential.user;
      console.log('useCreden tial', useCredential);
      setAuth({...user, mode: "GOOGLE_LOGIN"});
      navigate("/");
    }
    catch (error) {
      console.log('error:', error);
      setErrorOccur("User Not Found , please sign up first...")
    }

  }

  return (
    <Card style={{
      width: " 100%", maxWidth: " 500px", margin: "7rem auto", padding: "15px 25px", height: "auto",
    }}>
      <div style={{ textAlign: "center", margin: "2rem 3rem 7rem", height: "auto", maxHeight: "500px" }} className="form-wrapper">
        <h1> Hi, Welcome Back</h1>
        <p>Enter your credentials to continue</p>

        <div className="button-wrapper">
          <Button size="large" variant="outlined" onClick={LoginWithGoogle} className="">
            <GoogleIcon sx={{
              margin: " -1.5px 0px 0",
              width: " 20px",
              padding: " 0px 9px",
            }} color="primary" />  Sign In with google</Button>
        </div>
        <div style={{ margin: "20px" }}>
          <p style={{ textAlign: "center" }}>Sign in with Email address</p>
          <Chip
            sx={{
              height: 'auto',
              '& .MuiChip-label': {
                display: 'block',
                whiteSpace: 'normal',
                borderRadius: '3px',
                width: '120px',
                padding: ' 6px',
              },
            }}
            label="OR" variant="outlined" />
        </div>
        <div>
          <TextField
            fullWidth
            id="username"
            label="Email"
            type="Email"
            autoComplete="current-password"
            value={emailSignUp}
            onChange={(e) => setEmailSignUp(e.target.value)}
            error={Boolean(error)}
            helperText={error}
          />
        </div>

        <div style={{ margin: "25px 2px" }}>
          <FormControl fullWidth sx={{}} variant="outlined" error={Boolean(pwdError)}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              value={passwordSignUp}
              onChange={(e) => setPasswordSignUp(e.target.value)}
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
            />
            <FormHelperText id="filled-weight-helper-text">{pwdError}</FormHelperText>
          </FormControl>


        </div>

        <div className="button-wrapper" style={{ margin: "30px , 10px" }}>
          <Button sx={{ width: "100%" }} size="large" variant="contained" onClick={handleSignIn} className="">Sign in</Button>
        </div>

        <div style={{ color: "red", fontSize: "18px", padding: "20px" }}>
          {errorOccur}
        </div>

        <div style={{ margin: "30px 0" }}>
          <Link style={{ color: "#1976d2", textDecoration: "none" }} to={"/sign-up"}> Don't have an account?</Link>
        </div>


      </div>
    </Card>
  )
}


export default SignIn;