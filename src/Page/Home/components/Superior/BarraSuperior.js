import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';


const BarraSuperior = ({ Box, AppBar, Drawer, Toolbar, IconButton, CssBaseline, Lateral, mobileOpen, handleDrawerToggle, renderComponent, Outlet, drawerWidth, MenuIcon, container }) => {
    return (
        <>

            <Box sx={{ display: 'flex', height: '100vh' }}>
                <CssBaseline />
                <AppBar
                    className='appBar'
                    position='fixed'
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        backgroundColor: '#f9fafb'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            edge='start'
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' }, color: '#6587F4' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Breadcrumbs sx={{ display: 'flex' }} aria-label='breadcrumb' >
                            <Link underline='hover' color='inherit' href='/' sx={{ display: 'flex', alignItems: 'center' }}>
                                <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
                                Inicio
                            </Link>
                        </Breadcrumbs>
                        <Box sx={{ flexGrow: 1 }} />
                        <div className='d-flex justify-content-end'
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                        </div>
                    </Toolbar>
                </AppBar>
                <Box
                    component='nav'
                    className='drawer-Bar'
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label='mailbox folders'
                >
                    <Drawer
                        container={container}
                        variant='temporary'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {Lateral}
                    </Drawer>
                    <Drawer
                        variant='permanent'
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {Lateral}
                    </Drawer>
                </Box>
                <Box
                    component='main'
                    className='scroll-container-home'
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: '#ddd', height: '100%' }}
                >
                    <Toolbar />
                    <Outlet />
                    {renderComponent()}
                </Box>
            </Box>
        </>
    )
}

export default BarraSuperior