import * as React from 'react';
import { useNavigate } from "react-router-dom";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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
import MailIcon from '@mui/icons-material/Mail';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person3Icon from '@mui/icons-material/Person3';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import SendTimeExtension from '@mui/icons-material/SendTimeExtension';
import BarChartIcon from '@mui/icons-material/BarChart';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const drawerWidth = 240;

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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleClickAlumnos = () => {
 navigate('/Alumnos');
 }
 const handleClickMaestros = () => {
   navigate('/Master');
 }
 const handleClickGrupos = () => {
   navigate('/Grupo');
 }
 const handleClickMaterias = () => {
   navigate('/Materias');
 }
 const handleClickAsistencia = () => {
   navigate('/Asistencia');
 }
 const handleClicklistas = () => {
  navigate('/listas');
}
 const handleClickClase = () => {
   navigate('/Clase');
 }
 const handleClickHome = () => {
   navigate('/Home');
 }

 const handleClickPeriodos = () => {
  navigate('/Periodos');
}

const handleClickReunion = () => {
  navigate('/Reunion');
}
const handleClickGraficos = () => {
  navigate('/Graficos');
}
const handleClickCerrarSesion = () => {
  sessionStorage.removeItem('token');
  window.location.href = './login';
}

const isLogged = sessionStorage.getItem('token');
let vista = '';
vista = !isLogged ? 'none' : 'flex';

  return (
    <Box sx={{ display: vista }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
    >
      <ListItemButton onClick={ () => handleClickHome()}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={ () => handleClickAlumnos()}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Alumnos" />
      </ListItemButton>
      <ListItemButton onClick={ () => handleClickMaestros()} >
        <ListItemIcon>
          <Person3Icon/>
        </ListItemIcon>
        <ListItemText primary="Maestros" />
      </ListItemButton>
      <ListItemButton  onClick={ () => handleClickAsistencia()}>
        <ListItemIcon>
          <EmojiPeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Asistencia" />
      
      </ListItemButton>
      
    </List>
        <Divider />
        <List>
        <ListItemButton onClick={ () => handleClickGrupos()} >
        <ListItemIcon>
          <Diversity3Icon/>
        </ListItemIcon>
        <ListItemText primary="Grupos" />
      </ListItemButton>
      <ListItemButton onClick={ () => handleClickClase()} >
        <ListItemIcon>
          <GroupsIcon/>
        </ListItemIcon>
        <ListItemText primary="Clase" />
      </ListItemButton>
        <ListItemButton onClick={ () => handleClickPeriodos()} >
        <ListItemIcon>
          <EventNoteIcon/>
        </ListItemIcon>
        <ListItemText primary="Periodos" />
      </ListItemButton>
      <ListItemButton onClick={ () => handleClicklistas()} >
        <ListItemIcon>
          <AttachFileIcon/>
        </ListItemIcon>
        <ListItemText primary="Carga File" />
      </ListItemButton>

      <ListItemButton onClick={ () => handleClickMaterias()} >
        <ListItemIcon>
          < AutoStoriesIcon/>
        </ListItemIcon>
        <ListItemText primary="Materias" />
      </ListItemButton>

      <ListItemButton onClick={ () => handleClickReunion()} >
        <ListItemIcon>
          <SendTimeExtensionIcon/>
        </ListItemIcon>
        <ListItemText primary="Reunion" />
      </ListItemButton>
      <ListItemButton onClick={ () => handleClickGraficos()} >
        <ListItemIcon>
          <BarChartIcon/>
        </ListItemIcon>
        <ListItemText primary="Graficos" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClickCerrarSesion()} >
        <ListItemIcon>
          <PowerSettingsNewIcon/>
        </ListItemIcon>
        <ListItemText primary="Cerrar Sesión" />
      </ListItemButton>
      
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        
      </Box>
    </Box>
  );
}
