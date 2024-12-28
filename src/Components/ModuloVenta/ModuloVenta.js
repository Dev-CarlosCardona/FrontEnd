import React, { useCallback, useEffect, useState } from 'react';
import './Style/Style.css';
import { AllProductStock, UpdateProduct } from '../../Apis/Apis';

const ModuloVenta = () => {
    const [dataProductStock, setDataProductStock] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Obtener los productos del backend
    const getAllT_ProductStock = useCallback(async () => {
        setIsLoading(true);
        try {
            const DATA = await AllProductStock();
            if (Array.isArray(DATA)) {
                setDataProductStock(DATA); // Solo asigna si es un arreglo
            } else {
                console.error("Los datos recibidos no son un arreglo:", DATA);
                setDataProductStock([]); // Asigna un arreglo vacío como fallback
            }
        } catch (error) {
            console.error("Error al obtener productos:", error.message);
            alert("Error al obtener los productos. Intente nuevamente.");
            setDataProductStock([]); // Asegúrate de asignar un arreglo vacío en caso de error
        } finally {
            setIsLoading(false);
        }
    }, []);




    useEffect(() => {
        getAllT_ProductStock();
    }, [getAllT_ProductStock]);

    // Confirmar compra
    const handleConfirmPurchase = async () => {
        if (!selectedProduct) {
            alert('Seleccione un producto válido.');
            return;
        }


        try {
            const updatedProduct = {
                Nombre_Producto: selectedProduct.Nombre_Producto,
                Referencia: selectedProduct.Referencia,
                Precio: selectedProduct.Precio,
                Peso: selectedProduct.Peso,
                Categoria: selectedProduct.Categoria,
                Estado_Producto: 'NO DISPONIBLE', // Cambiar estado
                Cantidad: selectedProduct.Cantidad || 0, // Valor por defecto
            };


            await UpdateProduct(selectedProduct.id, updatedProduct);
            alert('Compra realizada exitosamente. Producto actualizado.');
            getAllT_ProductStock();
            setSelectedProduct(null);
        } catch (error) {
            console.error('Error al realizar la compra:', error.message);
            alert('Error al confirmar la compra. Intente nuevamente.');
        }
    };





    return (
        <>
            <div className="card border-light mt-3 mb-3 shadow-sm bg-body rounded">
                <div className="card-body">
                    <div className="text-center">
                        <div className="mb-0 title-mychange">VENTA DE PRODUCTO</div>
                    </div>
                </div>
            </div>
            <div className="p-3">
                <div className="mb-3">
                    <label>Selecciona un producto:</label>
                    <select
                        className="form-control"
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            const product = dataProductStock.find((p) => String(p.id) === selectedId);
                            setSelectedProduct(product);
                        }}
                        value={selectedProduct?.id || ''}
                    >
                        <option value="">Seleccione un producto</option>
                        {Array.isArray(dataProductStock) && dataProductStock.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.Nombre_Producto} - Precio: {product.Precio}
                            </option>
                        ))}
                    </select>



                </div>
                <button
                    className="btn btn-success"
                    onClick={handleConfirmPurchase}
                    disabled={!selectedProduct}
                >
                    Confirmar Compra
                </button>
            </div>
            {isLoading && (
                <div className="d-flex justify-content-center mt-4">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Cargando...</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModuloVenta;
