import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../../styles/navbar.css";
import logo from "./logo_ingles.png";  
import { ModalSesion } from "../modalSesion";
import { Context } from "../../store/appContext";

export const Navbar = () => {

	const { store, actions } = useContext(Context);
	const [modal, setModal] = useState(false);
    
    const openModal = () => {
        setModal(true);
    }
    
    const closeModal = () => {
        setModal(false);
    };

	return (
		
			<nav className="navbar">
				<div className="containerNavbar">
					<Link to="/">
						<img className="LogoChefEnCasa" src="logo_ingles.png" alt="Logo Chef at Home"></img>
					</Link>
					<div className="ml-auto">
							<button className="botonIniciarSesion" onClick={openModal}><i className="fas fa-user"></i>&nbsp; &nbsp; Log in</button>
							<ModalSesion show={modal} onClose={closeModal}></ModalSesion>
					</div>
				</div>
			</nav>
		);
	};

