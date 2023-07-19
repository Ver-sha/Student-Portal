import { Menu } from "@mui/icons-material"
import { Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { drawerWidth } from "../../layout/DashboardLayout/DashboardLayout";
import { useAuthContextData } from "../../Auth/AuthContext";


const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open'})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


// const MyDiv = styled('div')((theme)=>({
//   border: '1px solid red',
//   padding: '10px',
//   backgroundColor: 'crimson',

//   ...(open ? {color: 'green', font: '2rem'}: {})
// }))


const NavBar = ({ open, handleDrawerOpen }) => {
  const { authStatus, logout } = useAuthContextData();

  return <AppBar position="fixed" open={open}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: 5,
          ...(open && { display: 'none' }),
        }}
      >
        <Menu />
      </IconButton>
      <Typography className='list-item' variant="h6" noWrap component="div">
        <Link to="/">LOGO</Link>
      </Typography>
      <Box className="list" sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>

        <Typography className='list-item' variant="h6" noWrap component="div">
          <Link to="/faq">Faq</Link>
        </Typography>
        <Typography className='list-item' variant="h6" noWrap component="div">
          <Link to="/courses">Course</Link>
        </Typography>
        <Typography className='list-item' variant="h6" noWrap component="div">
          <Link to="/student"> Student</Link>
        </Typography>
        <Typography className='list-item' variant="h6" noWrap component="div">
          <Link to="/subject"> Subject</Link>
        </Typography>
      </Box>
      
      <Box sx={{ margin: "4px 10px" }}>
        <Typography className='list-item' variant="h6" noWrap component="div">
          <Link to="/"
            onClick={logout}
          >Logout</Link>
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 0 }}>

        <IconButton sx={{ p: 0 }}>
          <Avatar
            alt={authStatus.name || authStatus.email}
            title={authStatus.name || authStatus.email}
            src={authStatus.photoURL}
          />
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
}

export default NavBar;