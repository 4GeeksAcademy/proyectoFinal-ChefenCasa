import React, { useContext } from "react";

import "../../styles/cardPrivada.css";

export const CardPrivada = () => {
    return (
        <div className="contenedor-card">
            <img src="image-url.jpg" alt="Recipe Image" className="recipe-image" />
            <div className="toda info">
                <div className="card-content">
                    <h4 className="title">Recipe Title</h4>
                </div>

                <div className="datos d-flex">

                    <div className="reloj me-5">
                        <p className="time"><i className="fa-regular fa-clock"></i> 45 minutes</p>
                    </div>

                    <div className="corazon-info d-flex">
                        <p><i className="fa-solid fa-heart me-2"></i></p>
                        <button className="botonMasInfo">info</button>
                    </div>

                </div>
            </div>
        </div>

    );
};