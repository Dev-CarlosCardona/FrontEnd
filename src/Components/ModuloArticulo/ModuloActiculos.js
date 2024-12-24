import React, { useCallback, useEffect, useState } from 'react';
import './Styles/Style.css';
import { StyledDataGrid, CustomNoRowsOverlay, PAGE_SIZE, CustomPagination } from './Styles/Styles';

import { Button, AddRoundedIcon, SearchRoundedIcon, Modal, Swal, DeleteForeverRoundedIcon } from '../../Module-Export/Exportable';
import { AllProduct, RegisterProduct, UpdateProduct, DeleteProduct } from '../../Apis/Apis';

import ModalResgister from './ModalResgister/ModalResgister';
import DetailsProduct from './DetailsProduct/DetailsProduct';


const ModuloActiculos = () => {

    // MANEJADOR DE ESTADOS PARA CADA FUNCION
    const [dataProduct, setDataProduct] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openDetailsProduct, setOpenDetailsProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });


   

    //FUNCION PARA ABRIR EL MODAL DE REGISTRO
    const handleOpenModal = () => {
        setOpenModal(true)
    };
    //FUNCION PARA CERRAR EL MODAL DE REGISTRO
    const handleCloseModal = () => {
        setOpenModal(false)
    };

    const handleOpenDetailsProduct = (params) => {
        const product = params.row; 
        setSelectedProduct(product); 
        setOpenDetailsProduct(true); // Abre el modal de detalles
    };

    const handleCloseDetailProduct = () => {
        setSelectedProduct(null); // Limpia el producto seleccionado
        setOpenDetailsProduct(false);
    };



    //OBTIENE LOS DATOS DE LA TABLA TC
    const getAllT_Product = useCallback(async () => {
        setIsLoading(true);
        try {
            const DATA = await AllProduct();
            // Asegúrate de que DATA sea siempre un arreglo
            setDataProduct(Array.isArray(DATA) ? DATA : []);
        } catch (error) {
            console.error(error.message);
            alert('Error al cargar los productos. Intente nuevamente.');
            setDataProduct([]); // En caso de error, asegúrate de que sea un arreglo
        } finally {
            setIsLoading(false);
        }
    }, []);
    

    useEffect(() => {
        getAllT_Product();
    }, [getAllT_Product]);



    // REGISTRAR PRODUCTOS
    const onSubmitRegister = async (formData) => {
        setIsLoading(true);
    
        try {
            // Ya no se verifica si el nombre del producto existe
            const response = await RegisterProduct(formData);
    
            if (response && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro creado exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                });
    
                // Actualiza la tabla
                const newData = await AllProduct();
                setDataProduct(newData);
    
                handleCloseModal();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response?.message || 'Error desconocido al registrar el producto.',
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al registrar el producto. Intenta de nuevo.',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    


    // ACTUALIZA LOS PRODUCTOS
    const UpdateProducto = async (id, formData) => {
        setIsLoading(true);
        try {
            const response = await UpdateProduct(id, formData);

            if (response && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto actualizado exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Actualiza los datos de la tabla
                const newData = await AllProduct();
                setDataProduct(newData);

                handleCloseDetailProduct();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response?.message || 'Error desconocido al actualizar el producto.',
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al actualizar el producto. Intenta de nuevo.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // ELIMINA EL PRODUCTO SELECCIONADO
    const DeleteProducto = async (id) => {
        setIsLoading(true);
        try {
            const response = await DeleteProduct(id); // No necesitas enviar datos adicionales, solo el ID

            if (response && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Actualiza los datos de la tabla
                const newData = await AllProduct();
                setDataProduct(newData);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response?.message || 'Error desconocido al eliminar el producto.',
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al eliminar el producto. Intenta de nuevo.',
            });
        } finally {
            setIsLoading(false);
        }
    };






    //FUNCION PARA LA CAJA DE BUSQUEDA 
    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    // Filtrado de los datos según la búsqueda
    const filteredData = Array.isArray(dataProduct) ? dataProduct.filter((data) => {
        const searchString = busqueda.toLowerCase();
        return (
            data.Nombre_Producto.toLowerCase().includes(searchString) ||
            data.Referencia.toLowerCase().includes(searchString)
        );
    }) : [];


    // FUNCION PARA LA ORGANIZACION DE LAS COLUMNAS DE LA TABLA Y ADICIONAL TRAE LA INFORMACION
    const columns = [
        { field: 'Fecha_Creacion', headerName: 'Fecha Creación', flex: 1 },
        { field: 'Nombre_Producto', headerName: 'Producto', flex: 1 },
        { field: 'Referencia', headerName: 'Referencia', flex: 1 },
        { field: 'Precio', headerName: 'Precio', flex: 1 },
        { field: 'Peso', headerName: 'Peso', flex: 1 },
        { field: 'Categoria', headerName: 'Categoría', flex: 1 },
        { field: 'Estado_Producto', headerName: 'Estado Producto', flex: 1 },
        {
            field: '',
            headerName: 'Detalles para actualizar',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant='soft'
                    size='sm'
                    color='primary'
                    onClick={() => handleOpenDetailsProduct(params)}
                    style={{ display: 'block', margin: 'auto' }}
                >
                    <SearchRoundedIcon fontSize='small' />
                </Button>
            ),
        },
        {
            field: 'Eliminar',
            headerName: 'Eliminar Producto',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant='soft'
                    size='sm'
                    color='danger'
                    onClick={() =>
                        Swal.fire({
                            title: '¿Estás seguro?',
                            text: 'Esto no se puede deshacer',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Eliminar',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                DeleteProducto(params.row.ID); // Llama la función con el ID del producto
                            }
                        })
                    }
                    style={{ display: 'block', margin: 'auto' }}
                >
                    <DeleteForeverRoundedIcon fontSize='small' />
                </Button>
            ),
        },
    ];




    return (
        <>
            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='text-center'>
                        <div className='mb-0 title-mychange'>PRODUCTO INVENTARIO</div>
                    </div>
                </div>
            </div>

            {/* CAJA DE ESTILO PARA LOS BOTONES DE IMPORTE Y REGISTRO */}
            <div className='d-flex flex-row-reverse'>
                <div className=''>
                    <input placeholder='Buscar...' id='busqueda' className='form-control' style={Styles.Titles} type='search' value={busqueda} onChange={handleBusqueda} />
                </div>

                <div className='p-2'>
                    <Button variant='soft' size='sm' color='success' startDecorator={<AddRoundedIcon fontSize='small' />} onClick={handleOpenModal} >
                        Nuevo registro
                    </Button>
                </div>
            </div>
            <p>
            </p>

            {/* TABLA PRINCIPIAL PARA MOSTRAR EL INVENTARIO */}
            <div className='card border-light scroll-pepe'>
                <div className='card-body'>


                    {isLoading ? (
                        <div className='d-flex justify-content-center'>
                            <div className='spinner-border' role='status'>
                                <span className='sr-only'></span>
                            </div>
                        </div>
                    ) : (
                        <div style={{ height: '440px', width: '100%' }}>
                            <StyledDataGrid
                                rowHeight={33}
                                columns={columns}
                                rows={filteredData}
                                pageSizeOptions={[PAGE_SIZE]}
                                paginationModel={paginationModel}
                                getRowId={(data) => data.ID}
                                onPaginationModelChange={setPaginationModel}
                                slots={{ pagination: CustomPagination, noRowsOverlay: CustomNoRowsOverlay }}

                            />
                        </div>
                    )}
                </div>
            </div>

            <ModalResgister
                Modal={Modal}
                Styles={Styles}
                Button={Button}
                openModal={openModal}
                onSubmitRegister={onSubmitRegister}
                handleCloseModal={handleCloseModal}
            />
            <DetailsProduct
                Modal={Modal}
                Styles={Styles}
                Button={Button}
                product={selectedProduct}
                UpdateProducto={UpdateProducto}
                openDetailsProduct={openDetailsProduct}
                handleCloseDetailProduct={handleCloseDetailProduct}
            />

           
        </>
    )
}

const Styles = {
    Titles: {
        fontSize: '15px',
        fontWeight: 'bold',
        fontFamily: 'Nunito',
        color: '#000000'
    }
}

export default ModuloActiculos;