import React, { useState, useEffect } from 'react';
import Sidebar from '../../template/Sidebar';
import { Redirect } from 'react-router';
import axios from 'axios'
import { ApiUrl } from '../../services/apirest'
import { useHistory } from 'react-router';
import toast, { Toaster } from 'react-hot-toast'
import ConfirmDialog from '../ConfirmDialog';
import logo from '../../assets/img/logo.svg'

export default function NuevoProducto(props) {

    const history = useHistory();

    const [producto, setProducto] = useState(null)

    const [preview, setPreview] = useState(null)

    const [imagen, setImagen] = useState(null)

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' });

    useEffect(() => {
        console.log("ENTRANDO USE EFFECT")
        if (imagen) {
            console.log("DENTRO IF")
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result.toString())
            }
            reader.readAsDataURL(imagen)
        }
        else {
            console.log("DENTRO ELSE")
            setPreview(null)
        }
    }, [imagen])

    const removeEmptyFields = (data) => {
        Object.keys(data).forEach(key => {
            if (data[key] === '') {
                data[key] = null;
            }
        });
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setProducto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = async (data) => {
        removeEmptyFields(data);
        const fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }
        if (imagen) fd.append('imagen', imagen, imagen.name)
        const url = ApiUrl + '/productos'
        await axios.post(url, fd)
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

    const fileSelectedHandler = (event) => {
        setImagen(
            event.target.files[0]
        )

    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <React.Fragment>
            {props.location.state ? <Sidebar user={props.location.state} /> : <Redirect to='/autenticate'></Redirect>}
            <Toaster position="top-center" reverseOrder={false} />
            <div className="container" id="product-section">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Nuevo Producto:</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <img src={imagen ? preview : logo} alt="Logo" style={{ width: "80%", margin: "30px 30px 30px 30px" }} className="image-responsive" />
                    </div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input type="text" className="form-control" name="nombre" onChange={handleChange} required />
                                <label>Precio:</label>
                                <input type="number" step="0.01" min="0" className="form-control" name="precio" onChange={handleChange} required />
                                <label>Color:</label>
                                <input type="text" className="form-control" name="color" onChange={handleChange} />
                                <label>Marca:</label>
                                <input type="text" className="form-control" name="marca" onChange={handleChange} />
                                <label>Imagen:</label>
                                <input type="file" className="form-control-file" name="imagen" accept="image/*" onChange={fileSelectedHandler} />
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input type="number" min="0" className="form-control" name="stock" onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={() => {
                                    setConfirmDialog({
                                        isOpen: true,
                                        title: 'Estás seguro en ingresar este producto? ',
                                        subtitle: "Una vez editado se modificará el producto.",
                                        onConfirm: () => { onSubmit(producto) }
                                    })
                                }}>Ingresar Producto</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </div>
        </React.Fragment>
    );
}
