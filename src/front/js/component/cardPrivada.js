import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext'; // Importa tu store de Flux
import "../../styles/cardPrivada.css";
import { Link } from 'react-router-dom';

export const CardPrivada = () => {
    const { store, actions } = useContext(Context); // Obtén el store y las acciones de Flux

    useEffect(() => {
        actions.obtenerRecetas(); // Llama a la acción para obtener 50 recetas
    }, []); // Este efecto se ejecuta al montar el componente

    // Solo tomamos la primera receta si está disponible
    const receta = store.recetas.length > 0 ? store.recetas[0] : null;

    return (
        <div>
            <h1>Receta</h1>
            {receta ? (
                <div className="contenedor-card">
                    <img src={receta.image} alt={receta.title} className="recipe-image" />
                    <h4 className='title ms-auto'>{receta.title}</h4>
                    <div className='dato d-flex'>
                        <p className="time me-5 ">
                            <i className="fa-regular fa-clock"></i> {receta.tiempo_de_coccion}
                        </p>

                        <div className="corazon-info d-flex">
                            <p><i className="fa-solid fa-heart me-2"></i></p>
                            <Link to={"/vistaPrivada"}>
                            <button className="botonMasInfo">info</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Cargando receta...</p>
            )}
        </div>
    );
};
