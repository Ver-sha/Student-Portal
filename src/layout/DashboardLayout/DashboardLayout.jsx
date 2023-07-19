import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { MenuBookRounded, ExpandMore, Key } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Avatar } from '@mui/material';
import "./DashboardLayout.css";
import { signOut } from 'firebase/auth';
import { useAuthContextData } from '../../Auth/AuthContext';
import NavBar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';




export const drawerWidth = 240
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function MiniDrawer() {
  //on auth status

  //////////////////////
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { authStatus } = useAuthContextData()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (authStatus) {
    }
  }, [authStatus])


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <MenuListItem isMenuOpen={open} link='/courses' text={`Course`} icon={<MenuBookRounded />} />
          <MenuListItem isMenuOpen={open} link='/student' text={`Student-list`} icon={<MenuBookRounded />} />
          <MenuListItem isMenuOpen={open} link='/faq' text={`FAQ's`} icon={<MenuBookRounded />} />
        </List>
        <Divider />
        <List>
          <MenuListItem isMenuOpen={open} link='/subject' text={`Subject`} icon={<MenuBookRounded />} />
        </List>
      </Drawer>
      <Footer />
      <Box data-name="adasdasd" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box component="main">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

function MenuListItem({ isMenuOpen, text, link = '/', icon = null }) {
  return (<ListItem disablePadding sx={{ display: 'block' }}>
    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: isMenuOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isMenuOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: isMenuOpen ? 1 : 0 }} />
      </ListItemButton>
    </Link>
  </ListItem>)
}