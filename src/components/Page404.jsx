import React from 'react';
import logo from '../assets/img/404.gif'
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Limiter = styled.div`
    width: 100%;
    margin: 0 auto;
`

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background: #9053c7;
    background: -webkit-linear-gradient(-135deg, #361b35, #4158d0);
    background: -o-linear-gradient(-135deg, #c850c0, #4158d0);
    background: -moz-linear-gradient(-135deg, #4b1f48, #4158d0);
    background: linear-gradient(-135deg, #2b1129, #1f2a62);
`

const WrapPage = styled.div`
    width: 960px;
    background: #131111eb;
    border-radius: 10px;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    padding: 110px 130px 90px 95px;
    @media (max-width: 992px) {
        padding: 80px 90px 63px 85px;
    }
    @media (max-width: 768px) {
        padding: 80px 80px 63px 80px;
    }
    @media (max-width: 576px) {
        padding: 80px 15px 83px 15px;
    }
`
const Image404 = styled.img`
    width: 278px;
    float: left;
    @media (max-width: 992px) {
        width: 55%;
    }
    @media (max-width: 768px) {
        width: 45%;
    }
    @media (max-width: 576px) {
        width: 35%;
    }
`

const TextoPrincial = styled.h1`
    color: #f8d4ffc7;
    font-size: 2em;
    white-space: nowrap;
    @media (max-width: 992px) {
        font-size: 1.5em;
    }
    @media (max-width: 768px) {
        font-size: 1.1em;
    }
    @media (max-width: 576px) {
        font-size: 0.9em;
    }
`

const TextoSecundario = styled.p`
    color: #c1a6c7c6;
    font-size: 1em;
    white-space: pre-line;
    padding-bottom: 80px;
    @media (max-width: 992px) {
        font-size: 0.8em;
    }
    @media (max-width: 768px) {
        font-size: 0.6em;
    }
    @media (max-width: 576px) {
        font-size: 0.7em;
    }
`
const Texto = styled.div`
    padding-left: 25px;
    display: block;
    height: 100%;
    float: right;
`

const BotonLogin = styled(Link)`
    border-radius: 20px;
    height: 40px;
    background: #4a5ab6;
    padding: 10px 22px;
    color: #ffffffd1;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    white-space: nowrap;
    font-size: 12px;

    @media screen and (max-width: 768px){
        font-size: 8px;
        height: 32px;
        width: 70px;
        padding-left: 8px;
    }

    @media screen and (max-width: 320px){
        font-size: 8px;
        height: 32px;
    }

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #ffd3fc;
        color: #010606;
    }
`

export default function Page404() {

    return (
        <Limiter>
            <Container>
                <WrapPage>
                    <Image404 src={logo}></Image404>
                    <Texto>
                        <TextoPrincial>Página no encontrada</TextoPrincial>
                        <br />
                        <TextoSecundario>Regresa a la ruta princial para poder iniciar sesión...</TextoSecundario>
                        <BotonLogin to='/'>Regresar a Login</BotonLogin>
                    </Texto>
                </WrapPage>
            </Container>
        </Limiter>
    );
}