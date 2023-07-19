import { BottomNavigation, Paper } from "@mui/material";
import React from "react";


const Footer = () => {
  return (
    <>
     <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation sx={{background:"#1976d2"}}>        
          <p>@Copyright Reserved 2023</p>
      </BottomNavigation>
      </Paper>
    </>
  )
}
export default Footer;

