import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/cardPrivada.css";

export const CardPrivada = ({ receta }) => {
    const { actions, store } = useContext(Context);
    const [isFavorito, setIsFavorito] = useState(false);

    useEffect(() => {
        // Verificar si la receta está en favoritos
        const esFavorito = store.favoritos.some(fav => fav.api_receta_id === receta.id || fav.api_receta_id === receta.api_receta_id);
        setIsFavorito(esFavorito);
    }, [store.favoritos, receta]);

    const handleFavoritos = () => {
        if (isFavorito) {
            actions.eliminarFav(receta.id || receta.api_receta_id);
        } else {
            actions.addFavoritos(receta.id || receta.api_receta_id);
        }
        setIsFavorito(!isFavorito); // Cambiar el estado local
    }

    return (
        <div className="contenedor-card">
            <img src={receta.image} alt={receta.title} className="recipe-image" />
            <h4 className='title ms-auto'>{receta.title}</h4>
            <div className='dato d-flex'>
                <p className="time me-5" style={{ fontSize: "medium" }}>
                    <i className="fa-regular fa-clock"></i> {receta.tiempo_de_coccion}
                </p>
                <div className="corazon-info d-flex ">
                    <button className='botonFavorito'>
                        <i 
                            className="fa-solid fa-heart me-2" 
                            style={{ fontSize: "large", color: isFavorito ? "orange" : "gray" }} 
                            onClick={handleFavoritos}
                        ></i>
                    </button>
                    <Link to={`/recetaCompletaPrivada/${receta.id}`}>
                        <button className="botonMasInfo">info</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
