import React, { useState, useEffect } from 'react'
import Sidebar from '../../template/Sidebar';
import { Redirect } from 'react-router';
import axios from 'axios'
import { ApiUrl } from '../../services/apirest'
import { useHistory } from 'react-router';
import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom';
import logo from '../../assets/img/logo.svg'
import ConfirmDialog from '../ConfirmDialog';

export default function EditarProducto(props) {

    const [producto, setProducto] = useState(null)

    const history = useHistory();

    const [preview, setPreview] = useState(null)

    const [imagen, setImagen] = useState(null)

    const { id } = useParams();

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' });

    const handleChange = e => {
        const { name, value } = e.target;
        setProducto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const url = ApiUrl + '/productos/' + id;
        const getProducto = async () => {
            await axios.get(url)
                .then(response => {
                    setProducto(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        }
        if (imagen) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result.toString())
            }
            reader.readAsDataURL(imagen)
        }
        else {
            setPreview(null)
        }
        getProducto();
        // eslint-disable-next-line
    }, [imagen])

    const editarProducto = async () => {
        const url = ApiUrl + '/productos/' + id;
        const fd = new FormData();
        for (var key in producto) {
            if (producto[key]) fd.append(key, producto[key]);
        }
        if (imagen) fd.append('imagen', imagen, imagen.name)
        const editarProducto = async () => {
            await axios.put(url, fd)
                .then(response => {
                    if (response.data.status === 'Se actualizó al producto.') {
                        toast.success("Se editó el producto: " + producto.nombre)
                        history.push({
                            pathname: '/productos/administrar',
                            state: { user: props.location.state }
                        })
                    } else {
                        toast.error("Error al editar el producto");
                        console.log(response.data.error);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        editarProducto();
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
            {producto &&
                <div className="container" id="product-section">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12">
                                <h1>Editar Producto:</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <img src={producto.url_imagen ? 'http://localhost:3001/public/' + producto.url_imagen : preview ? preview : logo} alt={producto.nombre} style={{ width: "80%", margin: "30px 30px 30px 30px" }} className="image-responsive" />
                        </div>
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label for="nombre">Nombre:</label>
                                    <input type="text" className="form-control" name="nombre" value={producto.nombre} onChange={handleChange} />
                                    <label for="precio">Precio:</label>
                                    <input type="number" step="0.01" min="0" className="form-control" name="precio" value={producto.precio} onChange={handleChange} />
                                    <label for="color">Color:</label>
                                    <input type="text" className="form-control" name="color" value={producto.color} onChange={handleChange} />
                                    <label for="marca">Marca:</label>
                                    <input type="text" className="form-control" name="marca" value={producto.marca} onChange={handleChange} />
                                    <label>Imagen:</label>
                                    <input type="file" className="form-control-file" name="imagen" accept="image/*" onChange={fileSelectedHandler} />
                                    <label for="stock">Stock:</label>
                                    <div className="form-group">
                                        <input type="number" min="0" className="form-control" name="stock" value={producto.stock} onChange={handleChange} />
                                    </div>
                                    <button type="submit" class="btn btn-primary" onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Estás seguro en editar este producto? ',
                                            subtitle: "Una vez editado se modificará el producto.",
                                            onConfirm: editarProducto
                                        })
                                    }}>Editar Producto</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
                </div>
            }
        </React.Fragment >
    )
}
