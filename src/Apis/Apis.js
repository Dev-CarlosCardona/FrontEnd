import axios from 'axios';
import Service from "../Machine/Server";

const { Servidor } = Service();

const Apis = {
    AllProduct: `http://${Servidor}/API/GET/ALL-PRODUCT/`,
    RegisterProduct: `http://${Servidor}/API/POST/INSERT-PRODUCT/`,
    UpdateProduct: (id) => `http://${Servidor}/API/PUT/UPDATE-PRODUCT/${id}`,
    DeleteProduct: (id) => `http://${Servidor}/API/DELETE/PRODUCT-DELETE/${id}`,
    AllProductStock: `http://${Servidor}/API/GET/LIST/INVENTORY/STOCK/`,
};




export const AllProduct = async () => {
    try {
        const res = await axios.get(Apis.AllProduct);
        return res.data; // Devuelve los datos si el estado es 200
    } catch (error) {
        console.error('Error al buscar AllProduct:', error.message);
        throw new Error('Error al obtener los productos. Verifica la conexión.');
    }
};

export const AllProductStock = async () => {
    try {
        const res = await axios.get(Apis.AllProductStock);
        return res.data;
    } catch (error) {
        console.error('Error al buscar AllProductStock:', error.message);
        throw new Error('Error al obtener los productos. Verifica la conexión.');
    }
};

export const RegisterProduct = async (data) => {
    try {
        const res = await axios.post(Apis.RegisterProduct, data);
        if (res.data.success) {
            return res.data; // Operación exitosa
        } else {
            throw new Error(res.data.message);
        }
    } catch (error) {
        console.error('Error al registrar producto:', error.message);
        throw new Error(error.response?.data?.message || 'Error al registrar el producto.');
    }
};

export const UpdateProduct = async (id, data) => {
    try {
        const res = await axios.put(Apis.UpdateProduct(id), data);
        return res.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error('Error al actualizar producto:', error.message);
        throw new Error(error.response?.data?.message || 'Error al actualizar el producto.');
    }
};
export const DeleteProduct = async (id) => {
    try {
        const res = await axios.delete(Apis.DeleteProduct(id));
        return res.data;
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        throw new Error(error.response?.data?.message || 'Error al eliminar el producto.');
    }
};



