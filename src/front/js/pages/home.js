import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navbar } from "../../js/component/Navbar/navbar";
import { ModalRegistro } from "../component/modalRegistro";

import imagen_Home from "../../img/imagen_Home.jpg";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    };

	return (
		<div>
			< Navbar />
			<div className="bodyHome">
				<div className="descripcionHome">
					<h1>All the food for the week in one place</h1>
					<br></br>
					<h4>Chef at Home transforms the way to explore, plan, and organize gourmet recipes.</h4>
					<br></br>
					<h4>Save your favorite recipes, add personalized notes, and organize your weekly menu.</h4>
					<br></br>
					<br></br>
					<div>
						
					<button className="botonRegistrarseBody" onClick={openModal}>SIGN IN</button>
                        <ModalRegistro show={modal} onClose={closeModal}>
                        </ModalRegistro>
						
					</div>
				</div>
				<div>
					<img className="imagenHome" src={imagen_Home} alt="Imagen de una chica buscando recetas"/>
				</div>
			</div>
		</div>
	);
};
