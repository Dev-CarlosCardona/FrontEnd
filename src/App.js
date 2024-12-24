import React from 'react';
import RouterApp from './Router/Router'; 
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

function App() {
    return (
        <div className="App">
            <ScopedCssBaseline />
            <RouterApp /> 
        </div>
    );
}

export default App;
