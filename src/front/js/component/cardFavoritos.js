import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { NotaModal } from './notaModal';

export const CardFavoritos = ({ receta }) => {
    console.log("Receta en CardFavoritos:", receta);
    const { actions, store } = useContext(Context)
    const [show, setShowModal] = useState(false)

    const handleModal = () => {
        setShowModal(true)

    }

    const handleClose = () => {
        setShowModal(false)

    }

    // Manejo de la eliminación del favorito
    const handleEliminar = () => {

        actions.eliminarFav(receta.api_receta_id);


    };


    return (
        <div className="contenedorCardFavorito">
            <div className="datosCompletosFavoritos">
                <div className="datosTituloImagen">
                    <h4 className='tituloRecetaFavorito'>{receta.receta_title}</h4>
                    <img src={receta.imagen} alt={receta.title} className="imagenRecetaFavorito" />
                    <div className="botonesFavoritos">
                        <div className="corazonInfoFavorito ">
                            <button className="botonNotaFavoritos" onClick={handleModal}>Note</button>
                            <button className='corazonFavorito'>
                                <i className="fa-solid fa-heart me-2" style={{ fontSize: "large" }} onClick={() => handleEliminar(receta.api_receta_id)}></i>
                            </button>
                            <Link to={`/recetaCompletaPrivada/${receta.api_receta_id}`}>
                                <button className="botonMasInfoFavorito">info</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="descripcionBotones">
                    <div className='descripcionFavoritos'>
                        <p className="ingredientesFavoritos">
                            <strong>Ingredientes:</strong>
                        </p>
                        <ul>
                            {receta.ingredientes && receta.ingredientes.length > 0
                                ? receta.ingredientes.map((ingrediente, index) => (
                                    <li key={index}>{ingrediente}</li>
                                ))
                                : <li>Ingredientes no disponibles</li>}
                        </ul>

                        <p className="tiempoCoccionFavorito" style={{ fontSize: "medium" }}>
                            <i className="fa-regular fa-clock"></i> {receta.tiempo_de_coccion
                            } minutes
                        </p>
                    </div>
                </div>
            </div>
            <NotaModal show={show} apiRecetaId={receta.api_receta_id} onClose={handleClose} />
        </div>
    );
};