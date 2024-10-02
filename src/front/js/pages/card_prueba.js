import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext'; // Importa tu store de Flux

export const CardPrueba = () => {
    const { store, actions } = useContext(Context); // Obtén el store y las acciones de Flux

    useEffect(() => {
        
        actions.obtenerRecetas(); // Llama a la acción para obtener 50 recetas
    }, []); // Este efecto se ejecuta al montar el componente

    useEffect(() => {
        
        console.log(store.recetas);
        actions.obtenerMenu()
         
    }, [store.recetas]);

    return (
        <div>
            <h1>Recetas</h1>
            <ul>
    {store.recetas.length > 0 ? (
        store.recetas.map(receta => (
            <li key={receta.id}>
                <h2>{receta.title}</h2>
                <img src={receta.image} alt={receta.title} />
                <p>{receta.instructions}</p>
                <p>
                    {receta.pasos && receta.pasos.length > 0 
                        ? receta.pasos.map((paso, index) => (
                            <span key={index}>Paso {index + 1}: {paso.step}</span>
                          ))
                        : 'Pasos no disponibles'}
                </p>
                <p>{receta.tiempo_de_coccion}</p>
                <p>
                                <strong>Ingredientes:</strong>
                                <ul>
                                    {receta.ingredientes && receta.ingredientes.length > 0 
                                        ? receta.ingredientes.map((ingrediente, index) => (
                                            <li key={index}>{ingrediente.ingrediente}</li>
                                        ))
                                        : 'Ingredientes no disponibles'}
                                </ul>
                            </p>
            </li>
        ))
    ) : (
        <p>Cargando recetas...</p>
    )}
</ul>
        </div>
    );
};


