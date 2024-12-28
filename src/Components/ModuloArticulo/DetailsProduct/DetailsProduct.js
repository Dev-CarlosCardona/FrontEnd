import React, { useState, useEffect } from 'react';

const DetailsProduct = ({ Modal, UpdateProducto, product, openDetailsProduct, handleCloseDetailProduct, Styles, Button }) => {
    const [formData, setFormData] = useState({
        Nombre_Producto: '',
        Referencia: '',
        Precio: '',
        Peso: '',
        Categoria: '',
        Estado_Producto: '',
        Cantidad: ''
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // Función para formatear el precio
    const formatCurrency = (value) => {
        if (!value) return '';
        const stringValue = String(value);
        return stringValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    // Función para formatear el peso (agregar "g")
    const formatWeight = (value) => {
        if (!value) return '';
        const numericValue = String(value).replace(/\D/g, '');
        return numericValue ? `${numericValue} g` : '';
    };

    // Cargar los datos del producto seleccionado al abrir el modal
    useEffect(() => {
        if (product) {
            setFormData({
                Nombre_Producto: product.Nombre_Producto || '',
                Referencia: product.Referencia || '',
                Precio: formatCurrency(product.Precio || ''),
                Peso: formatWeight(product.Peso || ''),
                Categoria: product.Categoria || '',
                Estado_Producto: product.Estado_Producto || '',
                Cantidad: product.Cantidad || '',
            });
        }
    }, [product]);

    // Validar que todos los campos estén llenos
    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every((value) => value !== '');
        setIsButtonDisabled(!allFieldsFilled); // Deshabilita el botón si algún campo está vacío
    }, [formData]);

    // Manejador de cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'Precio') {
            setFormData({ ...formData, [name]: formatCurrency(value) });
        } else if (name === 'Peso') {
            setFormData({ ...formData, [name]: formatWeight(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Enviar los datos al backend
    const handleSubmit = () => {
        if (product && product.ID) {
            const formattedData = {
                ...formData,
                Precio: formData.Precio.replace(/\./g, ''), // Eliminar puntos del precio
                Peso: formData.Peso.replace(' g', ''), // Eliminar "g" del peso
            };

            UpdateProducto(product.ID, formattedData);
        }
    };

    return (
        <Modal
            title="Detalles para actualizar"
            width={800}
            footer={null}
            open={openDetailsProduct}
            onCancel={handleCloseDetailProduct}
        >
            <hr />
            <div className="d-flex flex-column mb-3">
                <div className="d-flex">
                    <div className="p-2 col-md-6">
                        <label htmlFor="Nombre_Producto" className="form-label text-muted">Nombre del producto</label>
                        <input
                            className="form-control"
                            type="text"
                            style={Styles.Titles}
                            id="Nombre_Producto"
                            name="Nombre_Producto"
                            value={formData.Nombre_Producto}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="p-2 col-md-6">
                        <label htmlFor="Referencia" className="form-label text-muted">Referencia</label>
                        <input
                            className="form-control"
                            type="text"
                            style={Styles.Titles}
                            id="Referencia"
                            name="Referencia"
                            value={formData.Referencia}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="d-flex">
                    <div className="p-2 col-md-6">
                        <label htmlFor="Precio" className="form-label text-muted">Precio</label>
                        <input
                            className="form-control"
                            type="text"
                            style={Styles.Titles}
                            id="Precio"
                            name="Precio"
                            value={formData.Precio}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="p-2 col-md-6">
                        <label htmlFor="Peso" className="form-label text-muted">Peso</label>
                        <input
                            className="form-control"
                            type="text"
                            style={Styles.Titles}
                            id="Peso"
                            name="Peso"
                            value={formData.Peso}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="d-flex">
                    <div className="p-2 col-md-6">
                        <label htmlFor="Categoria" className="form-label text-muted">Categoría</label>
                        <input
                            className="form-control"
                            type="text"
                            style={Styles.Titles}
                            id="Categoria"
                            name="Categoria"
                            value={formData.Categoria}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="p-2 col-md-6">
                        <label htmlFor="Estado_Producto" className="form-label text-muted">Estado Producto</label>
                        <select
                            className="form-select"
                            style={Styles.Titles}
                            id="Estado_Producto"
                            name="Estado_Producto"
                            value={formData.Estado_Producto}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione el estado</option>
                            <option value="STOCK">STOCK</option>
                            <option value="NO DISPONIBLE">NO DISPONIBLE</option>
                        </select>
                    </div>
                </div>

                <div className="d-flex">
                    <div className="p-2 col-md-6">
                        <label htmlFor="Cantidad" className="form-label text-muted">Cantidad</label>
                        <input
                            className="form-control"
                            type="number"
                            style={Styles.Titles}
                            id="Cantidad"
                            name="Cantidad"
                            value={formData.Cantidad}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="d-flex flex-row-reverse">
                    <div className="p-2">
                        <Button variant="soft" size="sm" color="danger" onClick={handleCloseDetailProduct}>
                            Cancelar
                        </Button>
                    </div>
                    <div className="p-2">
                        <Button
                            variant="soft"
                            size="sm"
                            color="success"
                            onClick={handleSubmit}
                            disabled={isButtonDisabled}
                        >
                            Actualizar Producto
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DetailsProduct;
