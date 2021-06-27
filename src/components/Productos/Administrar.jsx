import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../template/Sidebar';
import { ApiUrl } from '../../services/apirest'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import * as BtIcon from "react-icons/bs";
import { Redirect, useHistory } from 'react-router';
import toast, { Toaster } from 'react-hot-toast'
import ConfirmDialog from '../ConfirmDialog';

export default function Administrar(props) {

    const history = useHistory();

    const [productos, setProductos] = useState(null)

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' });

    const [reload, setReload] = useState(false)

    useEffect(() => {
        const url = ApiUrl + '/productos';
        const getProductos = async () => {
            await axios.get(url)
                .then(response => {
                    setProductos(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        }
        getProductos();
        setReload(true)
    }, [reload])

    const eliminarProducto = async (id) => {
        const url = ApiUrl + '/productos/' + id;
        const eliminarProducto = async () => {
            await axios.delete(url)
                .then(response => {
                    if (response.data.status === 'OK') {
                        toast.error("Se eliminó el producto")
                    } else {
                        toast.error("Error al eliminar el producto");
                        console.log(response.data.error);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        eliminarProducto();
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        setReload(false)
    }

    const handleClick = (path) => {
        history.push({
            pathname: path,
            state: { user: props.location.state }
        })
    }

    return (
        <div>
            {props.location.state ? <Sidebar user={props.location.state} /> : <Redirect to='/autenticate'></Redirect>}
            <Toaster position="top-center" reverseOrder={false} />
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-lg-8 cod-md-8 col-sm-8 cod-xs-12">
                        <Button primary onClick={() => handleClick('nuevo')}><BtIcon.BsFillPlusCircleFill /> Agregar nuevo producto</Button>
                    </div>
                </div>
                <hr />
                {productos &&
                    <div className="row">
                        <div className="col-lg-12 cod-md-12 col-sm-12 cod-xs-12">
                            <div className="table-responsive">
                                <Table striped bordered hover size="sm" responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Color</th>
                                            <th>Marca</th>
                                            <th>Stock</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productos.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{value.idproducto}</td>
                                                    <td>{value.nombre}</td>
                                                    <td>{value.precio}</td>
                                                    <td>{value.color}</td>
                                                    <td>{value.marca}</td>
                                                    <td>{value.stock}</td>
                                                    <td>
                                                        <Button variant="primary" onClick={() => handleClick(`editar/${value.idproducto}`)} size='sm'><BtIcon.BsPen /> Editar</Button>{' '}
                                                        <Button variant="danger" onClick={() => setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Estás seguro en eliminar este producto? ',
                                                            subtitle: "Una vez eliminado no puedes reestablecerlo.",
                                                            onConfirm: () => { eliminarProducto(value.idproducto) }
                                                        })} size='sm'><BtIcon.BsTrash /> Eliminar</Button>{' '}
                                                        <Button variant="info" onClick={() => handleClick(`inspeccionar/${value.idproducto}`)} size='sm'><BtIcon.BsEye /> Ver</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
                    </div>}
            </div>
        </div>
    )
}
