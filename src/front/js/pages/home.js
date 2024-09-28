import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { NavbarPublico } from "../component/Navbar/navbarPublico";

import imagen_Home from "../../img/imagen_Home.jpg";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			< NavbarPublico />
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
						<Link to="/iniciarSesion">
							<button className="botonRegistrarseBody">SIGN IN</button>
						</Link>
					</div>
				</div>
				<div>
					<img className="imagenHome" src={imagen_Home} alt="Imagen de una chica buscando recetas"/>
				</div>
			</div>
		</div>
	);
};
