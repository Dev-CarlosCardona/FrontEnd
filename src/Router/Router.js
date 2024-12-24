import React, { Suspense } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';
import PrivateRouter from './PrivateRouter';

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta principal */}
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<Loading />}>
                            <PrivateRouter />
                        </Suspense>
                    }
                />
                {/* Rutas dinámicas */}
                <Route
                    path="/home/*"
                    element={
                        <Suspense fallback={<Loading />}>
                            <PrivateRouter />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterApp;
