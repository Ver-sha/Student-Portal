import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../fireBaseConfig";


const authSample = {
  isAuth: false,
  accessToken: "",
  mode: "", // GOOGLE_LOGIN | EMAIL_LOGIN
  email: "",
  name: "",
  photoURL: "",
}


const localAuthString = window.localStorage.getItem('user');
debugger
var initialValue = !!localAuthString ? JSON.parse(localAuthString) : authSample;
debugger
console.log(initialValue);

const AuthContext = createContext(
  {
    authStatus: initialValue,
    setAuth: () => { },
    logout: () => { }
  });
export const useAuthContextData = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children} ) => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState(initialValue);

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setAuthStatus(authSample);
      navigate("/")
    })
  }

  const setAuth = (userData) => {
    setAuthStatus({
      isAuth: Boolean(userData.accessToken),
      accessToken: userData.accessToken,
      mode: userData.mode,
      email: userData.email,
      name: userData.displayName,
      photoURL: "https://static.vecteezy.com/system/resources/previews/019/900/306/non_2x/happy-young-cute-illustration-face-profile-png.png"
    })
  }

  useEffect(() => {
    debugger
    if (authStatus.isAuth) {
      debugger
      const authStatusString = JSON.stringify(authStatus);
      debugger
      window.localStorage.setItem("user", authStatusString);
    }
  }, [authStatus]);

  const values = { authStatus, setAuth, logout }
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;