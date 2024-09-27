import React, { useContext } from "react";

import "../../styles/cardPrivada.css";

export const CardPrivada = () => {
    return (
        <div className="contenedor-card">
            <img src="image-url.jpg" alt="Recipe Image" class="recipe-image"/>
                <div className="card-content">
                    <h4 className="title">Recipe Title</h4>
                    <p className="time"><i className="fa-regular fa-clock"></i> 45 minutes</p>
                </div>
        </div>

    );
};