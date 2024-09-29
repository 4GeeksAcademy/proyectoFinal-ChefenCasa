import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Private = () => {
    const { actions } = useContext(Context)
    const navigate = useNavigate()
    const cerrarSesion = () => {
        localStorage.clear();
        navigate('/login')

    }
    
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/login')
            } else {
                const auth = await actions.autentificacion('token')
                if (!auth) {
                    navigate('/login')
                    
                }
            }



        };
        checkAuth()



    }, [])
    return (
        <div className="contenedor_private" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '10px' }}>
            <h2 className="texto-private">Welcome to your private space!</h2>
            <button className="btn btn-primary" onClick={cerrarSesion}>Log Out</button>



        </div>
    )
}