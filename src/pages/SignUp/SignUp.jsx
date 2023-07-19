import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Chip, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
// import { useAuthData } from "../../AppRoutes/AuthWrapper/AuthWrapper";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../fireBaseConfig";
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, createUserWithEmailAndPassword, } from "firebase/auth";
import { LastPage, Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContextData } from "../../Auth/AuthContext";



const SignUp = () => {

  let navigate = useNavigate();
//for saving and redirection to home
  const {authStatus , setAuth} = useAuthContextData();
  const { isAuth } = authStatus;

  //passord show method
  const [showPassword, setShowPassword] = React.useState(false);
  const [userExist, setUserExist] = useState(false);
  //sign up with email , pasword states
  const [emailSignUp, setEmailSignUp] = useState("")
  const [passwordSignUp, setPasswordSignUp] = useState("")
  //email & password validation
  const [emailError , setEmailError] = useState("");
  const [pwdError , setPwdError] = useState("");

  //validate email & password function
  const validateEmail = (emailSignUp) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailSignUp);
  }
  const validatePassword = (passwordSignUp) => {
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return pwdRegex.test(passwordSignUp);
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const isValidEmail = validateEmail(emailSignUp);
  const isValidPassword = validatePassword(passwordSignUp);

  const SignUp = async () => {
   if(isValidEmail && isValidPassword){
    setEmailError("");
    setPwdError("");
    setUserExist("");
    try {
      const email = emailSignUp;
      const password = passwordSignUp;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user;
      const emailName = user.email;
      const name = user.displayName;
      const passwordShow = user.password;


      console.log('user', user);
      console.log('email', emailName);
      console.log('password', passwordShow);
      localStorage.setItem("email", emailName)
      localStorage.setItem("username", name)
 
      setEmailSignUp("");
      setPasswordSignUp("");
    
      alert("User Created successfully ");
      navigate("/sign-in")
    }
    catch (error) {
      console.log('error:', error);
      setUserExist("User Already Exist , please sign in...") ;
    }
   }
   else{
    setEmailError(!isValidEmail ? "invalid email address" : "");
    setPwdError(!isValidPassword? "Password must be of 8 digits & add 1 special character": '');
   }
  }
  

  return (
    <Card style={{ width: " 100%", maxWidth: " 500px", margin: "7rem auto", padding: "15px 25px", height: "auto" }}>
      <div style={{ textAlign: "center", margin: "2rem 3rem 7rem", height: "auto", maxHeight: "500px" }} className="form-wrapper">
        <h1>Sign Up </h1>
        <p>Enter your credentials to continue</p>
        <div style={{ margin: "20px" }}>
          <p style={{ textAlign: "center" }}>Sign up with Email address</p>

        </div>

        <div>
          <TextField
            fullWidth
            id="useremail"
            label="Email"
            type="email"
            autoComplete="current-emailId"
            value={emailSignUp}
            onChange={(e) => setEmailSignUp(e.target.value)}
            error = {Boolean(emailError)}
            helperText ={emailError}
          />
      
        </div>

        <div style={{ margin: "25px 2px" }}>
          <FormControl fullWidth sx={{}} variant="outlined" error={Boolean(pwdError)}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              value={passwordSignUp}
              onChange={(e) => setPasswordSignUp(e.target.value)}
              id="outlinedAdornmentPassword"
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
          <Button sx={{ width: "100%" }} size="large" variant="contained" onClick={SignUp} className="">Sign Up </Button>
        </div>

        <div style={{ color: "red", fontSize: "18px", padding: "20px" }}>
          {userExist}
        </div>

        <div style={{ margin: "30px 0" }}>
          <Link style={{ color: "#1976d2", textDecoration: "none" }} to={"/"}> Already have an account?</Link>
        </div>
      </div>
    </Card>
  )
}


export default SignUp;