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
        } else {
            console.log("Favoritos cargados:", store.favoritos);
        }
        console.log('favoritos', store.favoritos)
    }, []); // Dependencias del efecto


    return (
        <div className="bodyVistaFavoritos">
            <NavbarPrivado />
            <div className="contenedorCardsFavoritos">
                {store.favoritos.length > 0 ? (
                    store.favoritos.map((favoritos) => (
                        <CardFavoritos key={favoritos.id} receta={favoritos} /> // Pasa la receta como prop
                    ))
                ) : (
                    <p className="no-favoritos mt-3 ">♥ You don't have favorites yet ♥</p> // Mensaje si no hay recetas
                )}  
            </div>     
        </div>
    );
};