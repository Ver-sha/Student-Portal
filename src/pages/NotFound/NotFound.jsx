import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorImg from "../../Images/3d-female-character-with-404-error-message_23-2148938897.avif";

const NotFound = () => {
  let navigate = useNavigate();
  const goToHome =() => {
    navigate("/")
  }
  return(
    <Paper> 
    <Box component={'div'} style={{textAlign:"center" , position:"fixed" , top:"50%" , left:"50%" , transform:"translate(-50% ,-50%)"}}>
    <Box style={{fontSize:"3rem"}} component={'h1'}> 
     <img width={"100%"} src={ErrorImg} alt="" />
     </Box>
      <Typography component={'h2'}> The page you are lookng that does'nt exist...... </Typography>
      <Button onClick={goToHome}  variant="contained" >Back to home</Button>
    </Box>
    </Paper>
  )
}
export default NotFound;