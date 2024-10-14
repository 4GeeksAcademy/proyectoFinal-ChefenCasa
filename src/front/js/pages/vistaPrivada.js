import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { NavbarPrivado } from "../component/Navbar/navbarPrivado";
import { CardPrivada } from "../component/cardPrivada";
import "../../styles/vistaPrivada.css";


export const VistaPrivada = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.recetas.length === 0) { // Solo llama si no hay recetas
            actions.obtenerRecetas();
        }
    }, [actions, store.recetas.length]); // Dependencias del efecto


    return (
        <div className="bodyVistaPrivada">
            <NavbarPrivado />
            <div className="contenedorCartasRecetas" style={{display:"flex" , justifyContent: "center"}}>
                {store.recetas.length > 0 ? (
                    store.recetas.map((receta) => (
                        <CardPrivada key={receta.id} receta={receta} /> // Pasa la receta como prop
                    ))
                ) : (
                    <p>Loading...</p> // Mensaje si no hay recetas
                )}
                
                
            </div>
            
        </div>
    );
};