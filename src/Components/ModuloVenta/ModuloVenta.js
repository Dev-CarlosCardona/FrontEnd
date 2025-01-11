import React, { useCallback, useEffect, useState } from 'react';
import './Style/Style.css';
import { Swal } from '../../Module-Export/Exportable';
import { AllProductStock, UpdateProduct } from '../../Apis/Apis';

const ModuloVenta = () => {
    // Estados para manejar los datos y la lógica de la venta
    const [dataProductStock, setDataProductStock] = useState([]); // Lista de productos con stock
    const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado
    const [selectedQuantity, setSelectedQuantity] = useState(''); // Cantidad seleccionada por el usuario
    const [isLoading, setIsLoading] = useState(false); // Controlar el estado de carga (spinner)

    /**
     * Función que obtiene todos los productos con stock desde el backend.
     * Se utiliza useCallback para memorizar la función y evitar recrearla en cada render.
     */
    const getAllT_ProductStock = useCallback(async () => {
        setIsLoading(true); // Activamos el estado de carga antes de la petición
        try {
            const DATA = await AllProductStock(); // Llamado a la API que retorna todos los productos
            if (Array.isArray(DATA)) {
                /**
                 * Filtramos los productos que tengan una cantidad en stock mayor a 0.
                 * De esta manera, solo se mostrarán productos disponibles para vender.
                 */
                const productsWithStock = DATA.filter((product) => product.Cantidad > 0);
                setDataProductStock(productsWithStock);
            } else {
                console.error("Los datos recibidos no son un arreglo:", DATA);
                setDataProductStock([]);
            }
        } catch (error) {
            console.error("Error al obtener productos:", error.message);
            alert("Error al obtener los productos. Intente nuevamente.");
            setDataProductStock([]);
        } finally {
            // Independientemente del resultado, quitamos el estado de carga
            setIsLoading(false);
        }
    }, []);

    /**
     * useEffect que se ejecuta cuando el componente se monta,
     * llamando a la función para obtener los productos del backend.
     */
    useEffect(() => {
        getAllT_ProductStock();
    }, [getAllT_ProductStock]);

    /**
     * Maneja la confirmación de la compra. 
     * Valida el producto seleccionado y la cantidad, y luego actualiza el stock en la BD.
     */
    const handleConfirmPurchase = async () => {
        // Validaciones básicas para asegurarnos de que hay un producto y cantidad seleccionados
        if (!selectedProduct) {
            alert('Seleccione un producto válido.');
            return;
        }

        if (!selectedQuantity) {
            alert('Seleccione una cantidad válida.');
            return;
        }

        // Convertimos la cantidad a un número entero
        const quantityToBuy = parseInt(selectedQuantity, 10);
        if (quantityToBuy <= 0) {
            alert('La cantidad debe ser mayor que 0.');
            return;
        }

        // Verificamos que no se supere el stock disponible
        if (quantityToBuy > selectedProduct.Cantidad) {
            alert('La cantidad a comprar supera el stock disponible.');
            return;
        }

        // Calculamos el nuevo stock después de la compra
        const newStock = selectedProduct.Cantidad - quantityToBuy;

        // Definimos el estado del producto en base al nuevo stock (ejemplo: si queda 0, se marca como NO DISPONIBLE)
        let newEstado = 'STOCK';
        if (newStock === 0) {
            newEstado = 'NO DISPONIBLE';
        }

        try {
            // Construimos el objeto con el producto actualizado
            const updatedProduct = {
                ...selectedProduct,
                Cantidad: newStock,
                Estado_Producto: newEstado
            };

            // Llamamos a la API para actualizar el producto en la BD
            await UpdateProduct(selectedProduct.id, updatedProduct);

            // Mostramos una alerta de éxito usando SweetAlert
            Swal.fire({
                icon: 'success',
                title: '¡Compra realizada!',
                text: `Su compra fue realizada exitosamente.`,
                confirmButtonText: 'OK'
            });

            // Refrescamos la lista de productos para reflejar el nuevo stock
            getAllT_ProductStock();

            // Limpiamos la selección
            setSelectedProduct(null);
            setSelectedQuantity('');
        } catch (error) {
            console.error('Error al realizar la compra:', error.message);
            alert('Error al confirmar la compra. Intente nuevamente.');
        }
    };

    return (
        <>
            {/* Tarjeta de encabezado (opcionalmente podría contener más datos de la venta) */}
            <div className="card border-light mt-3 mb-3 shadow-sm bg-body rounded">
                <div className="card-body">
                    <div className="text-center">
                        <div className="mb-0 title-mychange">VENTA DE PRODUCTO</div>
                    </div>
                </div>
            </div>

            {/* Contenedor principal del módulo de venta */}
            <div className="p-3">
                {/* Selector de producto */}
                <div className="mb-3">
                    <label>Selecciona un producto:</label>
                    <select
                        className="form-control"
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            // Buscamos el producto en el array por su id
                            const product = dataProductStock.find((p) => String(p.id) === selectedId);
                            setSelectedProduct(product || null);
                            // Reiniciamos la cantidad seleccionada si cambia el producto
                            setSelectedQuantity('');
                        }}
                        // En caso de que no haya un producto seleccionado, el value será un string vacío
                        value={selectedProduct?.id || ''}
                    >
                        <option value="">Seleccione un producto</option>
                        {Array.isArray(dataProductStock) &&
                            dataProductStock.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.Nombre_Producto} - Precio: {product.Precio} - Stock: {product.Cantidad}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Solo se muestra el selector de cantidad si hay un producto seleccionado */}
                {selectedProduct && (
                    <div className="mb-3">
                        <label>Selecciona la cantidad a vender:</label>
                        <select
                            className="form-control"
                            onChange={(e) => setSelectedQuantity(e.target.value)}
                            value={selectedQuantity}
                        >
                            <option value="">Cantidad</option>
                            {
                                /**
                                 * Generamos un array con la longitud del stock disponible,
                                 * para que cada índice represente una cantidad posible de elegir.
                                 */
                                Array.from({ length: selectedProduct.Cantidad }, (_, i) => i + 1).map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                )}

                {/* Botón para confirmar la compra, se desactiva si no hay un producto o una cantidad seleccionados */}
                <button
                    className="btn btn-success"
                    onClick={handleConfirmPurchase}
                    disabled={!selectedProduct || !selectedQuantity}
                >
                    Confirmar Compra
                </button>
            </div>

            {/* Spinner de carga, se muestra mientras isLoading sea true */}
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
