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
            <div className="datosCompletosFavoritos">
                <div className="datosTituloImagen">
                    <h4 className='tituloRecetaFavorito'>{receta.title}</h4>
                    <img src={receta.image} alt={receta.title} className="imagenRecetaFavorito" />
                    <div className="botonesFavoritos">
                        <div className="corazonInfoFavorito ">
                            <button className="botonNotaFavoritos">Note</button>
                            <button className='corazonFavorito'>
                                <i className="fa-solid fa-heart me-2" style={{ fontSize: "large" }} onClick={handleFavoritos}></i>
                            </button>
                            <Link to={`/recetaCompletaPrivada/${receta.id}`}>
                                <button className="botonMasInfoFavorito">info</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="descripcionBotones">
                    <div className='descripcionFavoritos'>
                        <p className="ingredientesFavoritos">
                            <strong>Ingredientes:</strong>
                            <ul>
                                {receta.ingredientes && receta.ingredientes.length > 0
                                    ? receta.ingredientes.map((ingrediente, index) => (
                                        <li key={index}>{ingrediente.ingrediente}</li>
                                    ))
                                    : 'Ingredientes no disponibles'}
                            </ul>
                        </p>
                        <p className="tiempoCoccionFavorito" style={{ fontSize: "medium" }}>
                            <i className="fa-regular fa-clock"></i> {receta.tiempo_de_coccion}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};