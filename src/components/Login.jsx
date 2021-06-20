import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import logo from '../assets/img/img-01.png'
import axios from 'axios'
import { ApiUrl } from '../services/apirest'

import '../assets/css/main.css'
import '../assets/css/font-awesome.min.css'

export default function Login(props) {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleButton = async () => {
        const url = ApiUrl + '/auth/logearse';
        await axios.post(url, { email, password })
            .then(response => {
                if (response.data.status === "OK") {
                    localStorage.setItem("token", response.data.token);
                    props.history.push({
                        pathname: '/dashboard',
                        state: response.data.user
                    })
                } else {
                    toast.error(response.data.message);
                }
            }).catch(error => {
                console.log(error);
                toast.error("Error al conectarse con el servidor");
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">

                        <div className="login100-pic">
                            <img src={logo} alt="Imagen" />
                        </div>

                        <form className="login100-form validate-form" onSubmit={handleSubmit}>
                            <span className="login100-form-title">
                                Ingreso de Usuario
                            </span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={handleButton}>
                                    Ingresar
                                </button>
                            </div>

                            <div className="text-center p-t-56">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
