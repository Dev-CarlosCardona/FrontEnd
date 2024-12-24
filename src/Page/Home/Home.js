import React, { lazy, useState } from 'react';

import { Box, CssBaseline, AppBar, AttachMoneyRoundedIcon, Toolbar, IconButton, Drawer, drawerWidth, MenuIcon, PropTypes, List, Logotipo, ExpandMoreIcon, SettingsRoundedIcon, EventAvailableRoundedIcon, ListItemIcon, BrowserUpdatedIcon, AddBusinessRoundedIcon } from '../../Module-Export/Exportable';
import { Accordion, AccordionSummary, AccordionDetails, StyledListItemButton } from '../Home/Style/Style';
import './Style/Style.css';
import { useNavigate, Outlet } from 'react-router-dom';

const MenuLateral = lazy(() => import('../../Page/Home/components/Lateral/MenuLateral'));
const BarraSuperior = lazy(() => import('../../Page/Home/components/Superior/BarraSuperior'));

const ModuloActiculos = lazy(() => import('../../Components/ModuloArticulo/ModuloActiculos'));
const ModuloVentas = lazy(() => import('../../Components/ModuloVenta/ModuloVenta'));
const InicioPantalla = lazy(() => import('../../Components/InicioPantalla/InicioPantalla'));

function Home(props) {
  const navigate = useNavigate();
  const { ventana } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState('Cafeteria K');

  const [selectedComponent, setSelectedComponent] = useState('Inicio')


  //manejador el menu reducido
  const handleChange = (panel) => (e, newExpanded) => {
    setOpen(newExpanded ? panel : false);
  };
  //Vista celular
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
    navigate(`/home/${component.replace(/\s+/g, '-')}`);// cambia la URL cada vez que doy click en cualquier modulo
  };


  const Lateral = (

    <MenuLateral
      open={open}
      List={List}
      Logotipo={Logotipo}
      Accordion={Accordion}
      ListItemIcon={ListItemIcon}
      handleChange={handleChange}
      ExpandMoreIcon={ExpandMoreIcon}
      AccordionDetails={AccordionDetails}
      AccordionSummary={AccordionSummary}
      BrowserUpdatedIcon={BrowserUpdatedIcon}
      SettingsRoundedIcon={SettingsRoundedIcon}
      StyledListItemButton={StyledListItemButton}
      handleComponentSelect={handleComponentSelect}
      AttachMoneyRoundedIcon={AttachMoneyRoundedIcon}
      AddBusinessRoundedIcon={AddBusinessRoundedIcon}
      EventAvailableRoundedIcon={EventAvailableRoundedIcon}
    />
  )

  const container = ventana !== undefined ? () => ventana().document.body : undefined;

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Productos':
        return <ModuloActiculos />;
      case 'Ventas':
        return <ModuloVentas />;
      case 'Inicio':
        return <InicioPantalla />;
      default:
        return <div></div>;
    }
  };

  return (
    <BarraSuperior
      Box={Box}
      AppBar={AppBar}
      Outlet={Outlet}
      Drawer={Drawer}
      Toolbar={Toolbar}
      Lateral={Lateral}
      MenuIcon={MenuIcon}
      container={container}
      IconButton={IconButton}
      mobileOpen={mobileOpen}
      drawerWidth={drawerWidth}
      CssBaseline={CssBaseline}
      renderComponent={renderComponent}
      handleDrawerToggle={handleDrawerToggle}
    />
  )
}

Home.propTypes = {
  ventana: PropTypes.func,
};

export default Home
