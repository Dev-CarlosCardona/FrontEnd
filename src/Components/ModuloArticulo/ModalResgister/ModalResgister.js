import React, { useState } from 'react';

const ModalResgister = ({ Modal, openModal, handleCloseModal, Styles, Button, onSubmitRegister }) => {
    // Estado inicial del formulario
    const initialFormData = {
        Nombre_Producto: '',
        Referencia: '',
        Precio: '',
        Peso: '',
        Categoria: '',
        Estado_Producto: '',
        Cantidad: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    // FORMATEA LOS VALORES A MILES 
    const formatCurrency = (value) => {
        return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'Precio') {
            // FORMATEA EL NUMERO MIENTRAS SE ESCRIBE
            const formattedValue = formatCurrency(value);
            setFormData({ ...formData, [name]: formattedValue });
        } else if (name === 'Peso') {
            // EL PESO SIEMPRE VA TENER UN "g" AL FINAL PARA EL PESO
            const numericValue = value.replace(/\D/g, '');
            // ELIMINA CUALQUIER CARACTER QUE NO SE NUMERO
            setFormData({ ...formData, [name]: numericValue ? `${numericValue} g` : '' });
        } else {

            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = () => {
        // Prepara el formulario antes de enviarlo (quita el formato de precio y peso)
        const formattedData = {
            ...formData,
            Precio: formData.Precio.replace(/\./g, ''), // Quitar puntos del precio
            Peso: formData.Peso.replace(' g', ''), // Quitar "g" del peso
        };

        // Llama la función del componente padre
        onSubmitRegister(formattedData);
        // Resetea el formulario 
        setFormData(initialFormData);
        // Cierra el modal
        handleCloseModal();
    };

    // Función para validar si todos los campos están llenos
    const isFormValid = () => {
        return Object.values(formData).every((value) => value.trim() !== '');
    };

    return (
        <Modal
            title='Nuevo registro del producto'
            width={800}
            footer={null}
            open={openModal}
            onCancel={() => {
                setFormData(initialFormData);
                handleCloseModal();
            }}
        >
            <hr />
            <div className='d-flex flex-column mb-3'>

                <div className='d-flex'>
                    <div className='p-2 col-md-6'>
                        <label htmlFor='Nombre_Producto' className='form-label text-muted'>Nombre del producto</label>
                        <input
                            className='form-control'
                            type='text'
                            style={Styles.Titles}
                            id='Nombre_Producto'
                            name='Nombre_Producto'
                            value={formData.Nombre_Producto}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='p-2 col-md-6'>
                        <label htmlFor='Referencia' className='form-label text-muted'>Referencia</label>
                        <input
                            className='form-control'
                            type='text'
                            style={Styles.Titles}
                            id='Referencia'
                            name='Referencia'
                            value={formData.Referencia}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='d-flex'>
                    <div className='p-2 col-md-6'>
                        <label htmlFor='Precio' className='form-label text-muted'>Precio</label>
                        <input
                            className='form-control'
                            type='text'
                            style={Styles.Titles}
                            id='Precio'
                            name='Precio'
                            value={formData.Precio}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='p-2 col-md-6'>
                        <label htmlFor='Peso' className='form-label text-muted'>Peso</label>
                        <input
                            className='form-control'
                            type='text'
                            style={Styles.Titles}
                            id='Peso'
                            name='Peso'
                            value={formData.Peso}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='d-flex'>
                    <div className='p-2 col-md-6'>
                        <label htmlFor='Categoria' className='form-label text-muted'>Categoria</label>
                        <input
                            className='form-control'
                            type='text'
                            style={Styles.Titles}
                            id='Categoria'
                            name='Categoria'
                            value={formData.Categoria}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='p-2 col-md-6'>
                        <label htmlFor='Estado_Producto' className='form-label text-muted'>Estado Producto</label>
                        <select
                            className='form-select'
                            style={Styles.Titles}
                            id='Estado_Producto'
                            name='Estado_Producto'
                            value={formData.Estado_Producto}
                            onChange={handleChange}
                        >
                            <option value=''>Seleccione el estado</option>
                            <option value='STOCK'>STOCK</option>
                            <option value='NO DISPONIBLE'>NO DISPONIBLE</option>
                        </select>
                    </div>
                </div>

                <div className='d-flex'>
                    <div className='p-2 col-md-6'>
                        <label htmlFor='Cantidad' className='form-label text-muted'>Cantidad</label>
                        <input
                        className='form-control'
                        type='number'
                        style={Styles.Titles}
                        id='Cantidad'
                        name='Cantidad'
                        value={formData.Cantidad}
                        onChange={handleChange}
                        />
                    </div>

                </div>

                <div className='d-flex flex-row-reverse'>
                    <div className='p-2'>
                        <Button variant='soft' size='sm' color='danger' onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                    </div>
                    <div className='p-2'>
                        <Button variant='soft' size='sm' color='success' onClick={handleSubmit} disabled={!isFormValid()}>
                            Crear Producto
                        </Button>
                    </div>
                </div>

            </div>
        </Modal>
    );
};

export default ModalResgister;
