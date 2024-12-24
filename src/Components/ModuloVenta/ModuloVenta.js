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
            console.log("Datos cargados:", DATA); // Verifica que los productos tengan el campo `id`
            setDataProductStock(DATA);
        } catch (error) {
            console.error(error.message);
            alert('Error al obtener los productos. Intente nuevamente.');
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
    
        console.log("Producto seleccionado:", selectedProduct); // Verifica el objeto completo
    
        try {
            const updatedProduct = {
                ...selectedProduct,
                Estado_Producto: 'NO DISPONIBLE', // Cambiar el estado a "NO DISPONIBLE"
            };
    
            await UpdateProduct(selectedProduct.id, updatedProduct); // Asegúrate de que `id` no sea undefined
    
            alert('Compra realizada exitosamente. Producto actualizado.');
            getAllT_ProductStock();
            setSelectedProduct(null); // Reinicia el producto seleccionado
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
                            const selectedId = parseInt(e.target.value, 10);
                            const product = dataProductStock.find((p) => p.id === selectedId);
                            setSelectedProduct(product); // Actualiza el estado con el producto seleccionado
                        }}
                        value={selectedProduct?.id || ''}
                    >
                        <option value="">Seleccione un producto</option>
                        {dataProductStock.map((product) => (
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
