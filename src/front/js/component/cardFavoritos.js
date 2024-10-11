import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { NotaModal } from './notaModal';
import "../../styles/cardFavoritos.css";

export const CardFavoritos = ({ receta }) => {
    const { actions } = useContext(Context);
    const [isFavorito, setIsFavorito] = useState(true); // Por defecto, es favorito (naranja)
    const [show, setShowModal] = useState(false); // Para controlar el modal
    const [notaTexto, setNotaTexto] = useState('');

    // Abrir y cerrar modal
    const handleModal = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    // Manejo de la eliminación del favorito
    const handleEliminar = () => {
        actions.eliminarFav(receta.api_receta_id);
        setIsFavorito(false); // Cambia el color a gris al eliminar
    };

    return (
        <div className="contenedorCardFavorito">
            <div className="datosCompletosFavoritos">
                <div className="datosTituloImagen">
                    <h4 className='tituloRecetaFavorito'>{receta.receta_title}</h4>
                    <img src={receta.imagen} alt={receta.title} className="imagenRecetaFavorito" />
                    <div className="botonesFavoritos">
                        <div className="corazonInfoFavorito ">
                            <button className="botonNotaFavoritos" onClick={handleModal}>{notaTexto ? "1 " : "" }Note</button>
                            <button className='corazonFavorito'>
                                <i 
                                    className="fa-solid fa-heart me-2" 
                                    style={{ color: isFavorito ? "orange" : "gray" }} 
                                    onClick={handleEliminar}
                                ></i>
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
                        <ul className='ingredientesFavoritos'>
                            {receta.ingredientes && receta.ingredientes.length > 0
                                ? receta.ingredientes.map((ingrediente, index) => (
                                    <li key={index}>{ingrediente}</li>
                                ))
                                : <li>Ingredientes no disponibles</li>}
                        </ul>

                        <p className="tiempoCoccionFavorito">
                            <i className="fa-regular fa-clock"></i> {receta.tiempo_de_coccion} minutes
                        </p>
                    </div>
                </div>
            </div>

            {/* El modal de nota */}
            <NotaModal show={show} apiRecetaId={receta.api_receta_id} onClose={handleClose} notaTexto={notaTexto} setNotaTexto={setNotaTexto} />
        </div>
    );
};
