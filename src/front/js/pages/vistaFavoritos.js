import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { NavbarPrivado } from "../component/Navbar/navbarPrivado";
import { CardFavoritos } from "../component/cardFavoritos";
import "../../styles/vistaFavoritos.css";

export const VistaFavoritos = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.favoritos.length === 0) { // Solo llama si no hay recetas
            actions.obtenerFavoritos();
        } else{
            console.log("Favoritos cargados:", store.favoritos);
        }
    }, [actions, store.favoritos.length]); // Dependencias del efecto


    return (
        <div>
            <NavbarPrivado />
            <div className="contenedorCardsFavoritos">
                {store.favoritos.length > 0 ? (
                    store.favoritos.map((favoritos) => (
                        
                        <CardFavoritos key={favoritos.api_receta_id} receta={favoritos} /> // Pasa la receta como prop
                    ))
                ) : (
                    <p>No hay recetas disponibles.</p> // Mensaje si no hay recetas
                )}
            </div>
        </div>
    );
};