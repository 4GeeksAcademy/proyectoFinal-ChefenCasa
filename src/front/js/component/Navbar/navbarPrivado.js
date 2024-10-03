import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/navbar.css";
import logo from "./logo_ingles.png";
import { ModalPerfil } from "../modalPerfil";
import { Context } from "../../store/appContext";

export const NavbarPrivado = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();  

    const [showModalPerfil, setShowModalPerfil] = useState(false);
    const openModalProfile = () => {
        setShowModalPerfil(true);
    };
    
    const closeModal = () => {
        setShowModalPerfil(false);
    };

    const logout = async () => {
        await actions.cerrarSesion();
        navigate('/'); 
    };

    return (
        <>
        <nav className="navbar">
            <div className="container">
                <Link to="/">
                    <img className="LogoChefEnCasa" src={logo} alt="Logo Chef at Home"></img>
                </Link>
                <div className="btn-group">
                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user fa-xl"></i> &nbsp; <i className="fas fa-bars fa-xl"></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={openModalProfile}>Profile</a></li>
                        <li><a className="dropdown-item" href="#">Favorites</a></li>
                        <li><a className="dropdown-item" href="#">Weekly Menu</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" style={{color: 'red'}} href="#" onClick={logout}>Sign out</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <ModalPerfil show={showModalPerfil} onClose={closeModal} />
        </>
    );
};
