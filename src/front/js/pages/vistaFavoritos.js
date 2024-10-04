import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { NavbarPrivado } from "../component/Navbar/navbarPrivado";
import { CardFavoritos } from "../component/cardFavoritos";
import "../../styles/vistaFavoritos.css";

export const VistaFavoritos = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.recetas.length === 0) { // Solo llama si no hay recetas
            actions.obtenerRecetas();
        }
    }, [actions, store.recetas.length]); // Dependencias del efecto


    return (
        <div>
            <NavbarPrivado />
            <div className="contenedorCardsFavoritos">
                {store.recetas.length > 0 ? (
                    store.recetas.map((receta) => (
                        <CardFavoritos key={receta.id} receta={receta} /> // Pasa la receta como prop
                    ))
                ) : (
                    <p>No hay recetas disponibles.</p> // Mensaje si no hay recetas
                )}
            </div>
        </div>
    );
};