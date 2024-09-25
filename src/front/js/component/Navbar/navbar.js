import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/navbar.css";


export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/">
					<img src="logo_sin_fondo.png" alt="Logo Chef en Casa"></img>
				</Link>
				<div className="ml-auto">
					<Link to="/iniciarSesion">
						<button className="BotonIniciarSesion">Iniciar sesión</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
