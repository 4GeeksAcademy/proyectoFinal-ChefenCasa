import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

export const CardPrivada = ({ receta }) => {

    const { actions, store } = useContext(Context)
    const handleFavoritos = () => {
        actions.addFavoritos(receta.id || receta.api_receta_id)
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
                        <i className="fa-solid fa-heart me-2" style={{ fontSize: "large" }} onClick={handleFavoritos}></i>
                    </button>
                    <Link to={`/recetaCompletaPrivada/${receta.id}`}>
                        <button className="botonMasInfo">info</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};