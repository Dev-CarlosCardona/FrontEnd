import React, { useState } from 'react';

const MenuLateral = ({
    open,
    List,
    Logotipo,
    Accordion,
    handleChange,
    ListItemIcon,
    ExpandMoreIcon,
    AccordionSummary,
    AccordionDetails,
    BrowserUpdatedIcon,
    SettingsRoundedIcon,
    StyledListItemButton,
    handleComponentSelect,
    AddBusinessRoundedIcon,
    AttachMoneyRoundedIcon,
    EventAvailableRoundedIcon,
}) => {

    const [selectedIcon, setSelectedIcon] = useState(null);


    const handleIconClick = (iconName) => {
        setSelectedIcon(iconName);
        handleComponentSelect(iconName);
    }
    return (
        <>

            <div className=''>
                <div className='container-k'>
                    <img className='logo-k' src={Logotipo} alt='' />
                </div>

                <List>
                    <Accordion expanded={open === 'Cafeteria K'} onChange={handleChange('Cafeteria K')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <div className='AccordionSummary-style'>
                                <SettingsRoundedIcon fontSize='small' />
                            </div>
                            <div className='title-modulos'>Cafeteria K</div>
                        </AccordionSummary>

                        <AccordionDetails>

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className='NewspaperRoundedIcon-style'>
                                        <EventAvailableRoundedIcon fontSize='small' className={
                                            selectedIcon === 'Productos' ||
                                                selectedIcon === 'Ventas'
                                                ? 'selectModule' : ''} />
                                    </div>
                                    <div className='title-modulos'>INVENTARIO DEL PRODUCTO</div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        <StyledListItemButton onClick={() => handleIconClick('Productos')} selected={selectedIcon === 'Productos'}>
                                            <ListItemIcon>
                                                <AddBusinessRoundedIcon fontSize='small' className={selectedIcon === 'Productos' ? 'selectModule' : ''} />
                                            </ListItemIcon>
                                            <div className='title-modulos'>Productos</div>
                                        </StyledListItemButton>

                                        <StyledListItemButton onClick={() => handleIconClick('Ventas')} selected={selectedIcon === 'Ventas'}>
                                            <ListItemIcon>
                                                <AttachMoneyRoundedIcon fontSize='small' className={selectedIcon === 'Ventas' ? 'selectModule' : ''} />
                                            </ListItemIcon>
                                            <div className='title-modulos'>Ventas</div>
                                        </StyledListItemButton>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>

                    </Accordion>
                </List>
            </div>
        </>
    )
}

export default MenuLateral;
