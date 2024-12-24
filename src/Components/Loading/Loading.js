import React from 'react';
import './StyleLoading.css';
import LogoKT from '../../BLogos/LogoKT.png';

const Loading = () => {
    return (
        <>
            <div className='container-Loader'>
                <div className='loader-1' >
                    <div className='loader-2'></div>
                    <div className='loader-3'></div>
                    <div className='loader-4'></div>
                </div>
                <div className='none-animation'>
                    <div>
                        <img className='logotipo-K' src={LogoKT} alt='Logotipo' />
                    </div>
                </div>

            </div>
        </>
    );
};

export default Loading;