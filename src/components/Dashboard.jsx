import React from 'react'
import Sidebar from '../template/Sidebar';
import Autenticate from './Autenticate';

export default function Dashboard(props) {

    return (
        <div>
            {props.location.state ? <Sidebar user={props.location.state} /> : <Autenticate />}
        </div>
    )
}
