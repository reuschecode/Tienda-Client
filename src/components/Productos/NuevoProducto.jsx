import React from 'react';
import Sidebar from '../../template/Sidebar';
import { Redirect } from 'react-router';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ApiUrl } from '../../services/apirest'
import { useHistory } from 'react-router';
import toast, { Toaster } from 'react-hot-toast'

export default function NuevoProducto(props) {

    const history = useHistory();

    const { register, errors, handleSubmit } = useForm()

    const removeEmptyFields = (data) => {
        Object.keys(data).forEach(key => {
            if (data[key] === '') {
                data[key] = null;
            }
        });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const onSubmit = async (data, e) => {
        removeEmptyFields(data);
        console.log(data);
        const url = ApiUrl + '/productos'
        await axios.post(url, data)
            .then(response => {
                if (response.data.status === "Se guardó al producto.") {
                    toast.success("Se ingresó el producto: " + data.nombre)
                    history.push({
                        pathname: '/productos/administrar',
                        state: { user: props.location.state }
                    })
                } else {
                    toast.error("Error al guardar el producto");
                    console.log(response.data.error);
                }
            }).catch(error => {
                toast.error("Error interno, intenta nuevamente en un momento.");
                console.log(error);
            })
    }

    return (
        <React.Fragment>
            {props.location.state ? <Sidebar user={props.location.state} /> : <Redirect to='/autenticate'></Redirect>}
            <Toaster position="top-center" reverseOrder={false} />
            <h1>Formulario Producto</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Nombre</label>
                <input className="form-control my-2" {...register('nombre', { required: true, message: 'El nombre es obligatorio' })} />
                <label>Precio</label>
                <input className="form-control my-2" type="number" step="0.01" min="0" {...register('precio', { required: true, message: 'El precio es obligatorio' })} />
                <label>Color</label>
                <input className="form-control my-2" {...register('color', { required: false })} />
                <label>Marca</label>
                <input className="form-control my-2" {...register('marca', { required: false })} />
                <label>Stock</label>
                <input className="form-control my-2" type="number" min="0" {...register('stock', { required: true, message: 'El stock es obligatorio' })} />
                <span className="text-danger text-small d-block mb-2">
                    {errors?.nombre?.message}
                    {errors?.precio?.message}
                    {errors?.stock?.message}
                </span>
                <button className="btn btn-primary">Enviar</button>
            </form>
        </React.Fragment>
    );
}
