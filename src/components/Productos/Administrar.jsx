import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../template/Sidebar';
import { ApiUrl } from '../../services/apirest'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import * as BtIcon from "react-icons/bs";
import { Redirect, useHistory } from 'react-router';
// eslint-disable-next-line
import toast, { Toaster } from 'react-hot-toast'

export default function Administrar(props) {

    const history = useHistory();

    const [productos, setProductos] = useState(null)

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
    }, [])

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
            <Button primary onClick={() => handleClick('nuevo')}><BtIcon.BsFillPlusCircleFill /> Agregar nuevo producto</Button>
            {productos &&
                <div style={{ margin: 'auto', width: '80%' }}>
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
                                            <Button variant="danger" onClick={() => handleClick(`eliminar/${value.idproducto}`)} size='sm'><BtIcon.BsTrash /> Eliminar</Button>{' '}
                                            <Button variant="info" onClick={() => handleClick(`inspeccionar/${value.idproducto}`)} size='sm'><BtIcon.BsEye /> Ver</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>}
        </div>
    )
}
