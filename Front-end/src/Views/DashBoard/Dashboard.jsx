import * as React from 'react';
import { Button, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';  // ✅ Importación correcta
import BarChartIcon from '@mui/icons-material/BarChart';  // ✅ Importación correcta
import DynamicComponentLoader from "../../Components/DynamicComponentLoader";
import { useState } from "react";
import Stack from '@mui/material/Stack';

const drawerWidth = 240;
const NAVIGATION = [
  {
    segment: 'ordenes',
    title: 'Ordenes',
    icon: <ShoppingCartIcon />,
    path: '/ordenes',
  },
  {
    segment: 'transportista',
    title: 'Transportista',
    icon: <BarChartIcon />,
    path: '/transportista',
  },
  {
    title: 'Rutas',
    icon: <BarChartIcon />,
    path: '/transportista',
  },
];
export default function ClippedDrawer() {
  const [componentName, setComponentName] = useState('ListaOrdenes');

  const handleComponentChange = (componentName) => {
    setComponentName(componentName);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Coordinadora
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>

          <Divider />
          <List>
            {NAVIGATION.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.title === 'Ordenes') {
                      handleComponentChange('ListaOrdenes'); // Solo cambia el componente en "Ordenes"
                    } else if (item.title === "Rutas") {
                      handleComponentChange('ListaRutas');
                    } else if( item.title === "Transportista"){
                      handleComponentChange('ListaTransportista');
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack marginBottom={3} spacing={2} direction="row">
          <Button onClick={() => handleComponentChange('Envio')} variant="contained">Nuevo</Button>
        </Stack>
        <DynamicComponentLoader componentName={componentName} />
      </Box>
    </Box>
  );
}