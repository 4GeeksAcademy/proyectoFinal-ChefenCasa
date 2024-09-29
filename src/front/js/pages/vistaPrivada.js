import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"

export const VistaPrivada = ()=>{
    const { store, actions } = useContext(Context);
   

    return ( 
        <div className="vista-privada">
            <h1>Bienvenido, {store.userName || "Usuario"}</h1> 
            <p>TEXTO DE PRUEBA</p>
            
        </div>
    );
};