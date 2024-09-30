import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { NavbarPrivado } from "../component/Navbar/navbarPrivado";
import "../../styles/recetaCompleta.css"

export const RecetaCompletaPrivada = () => {
    return (<div>

        <NavbarPrivado />



        <div className="container mt-5">
            <header className="recipe-header text-center mb-4">
                <h2>Receta Completa</h2>
            </header>

            <div className="recipe-content row">
                <div className="ingredientes col-12 col-md-6  rounded">
                    <h3>Carne al Horno</h3>
                    <h4>Ingredientes</h4>
                    <ul>

                    </ul>
                    <div className="preparation-time d-flex align-items-center mt-3">
                        <i className="fa-regular fa-clock"></i>
                        <span className="ms-2">30 minutos</span>
                    </div>
                </div>

                <div className="col-12 col-md-8 p-4 rounded">
                    <h4>Preparación</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>

                </div>
            </div>

            <div className="note-section mt-5 text-center">
                <div className="row">
                    <div className="col-md-6">
                        <img src="image-url" alt="Imagen receta " className="img-fluid rounded" />
                    </div>

                </div>
                <div >

                    <div >
                        <button className="btn btn-secondary">Agregar nota</button>
                    </div>
                    <div >
                        <button className="btn btn-secondary">Menú Semanal</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}