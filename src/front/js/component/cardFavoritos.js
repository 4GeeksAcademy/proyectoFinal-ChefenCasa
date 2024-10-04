import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

export const CardFavoritos = ({ receta }) => {

    const { actions, store } = useContext(Context)
    const handleFavoritos = () => {
        actions.addFavoritos(receta.id)
    }

    return (
        <div className="contenedorCardFavorito">
            <h4 className='tituloRecetaFavorito'>{receta.title}</h4>
            <img src={receta.image} alt={receta.title} className="imagenRecetaFavorito" />
            <div className='descripcionFavoritos'>
                <p className="tiempoCoccionFavorito" style={{ fontSize: "medium" }}>
                    <i className="fa-regular fa-clock"></i> {receta.tiempo_de_coccion}
                </p>
                <div className="corazonInfoFavorito ">
                    <button className='corazonFavorito'>
                        <i className="fa-solid fa-heart me-2" style={{ fontSize: "large" }} onClick={handleFavoritos}></i>
                    </button>
                    <Link to={`/recetaCompletaPrivada/${receta.id}`}>
                        <button className="botonMasInfoFavorito">info</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};