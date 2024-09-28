import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/navbar.css";
import logo from "./logo_ingles.png";


export const NavbarPublico = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/">
					<img className="LogoChefEnCasa" src="logo_ingles.png" alt="Logo Chef at Home"></img>
				</Link>
				<div className="ml-auto">
					<Link to="/iniciarSesion">
						<button className="botonIniciarSesion"><i className="fas fa-user"></i>&nbsp; &nbsp; Log in</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
