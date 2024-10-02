import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { NavbarPrivado } from "../component/Navbar/navbarPrivado";
import { CardPrivada } from "../component/cardPrivada";

import "../../styles/vistaPrivada.css";


export const VistaPrivada = () => {
	const { store, actions } = useContext(Context);

	return (
        <div>
        <NavbarPrivado />
        <div className="contenedorCartasRecetas col-3">
            <CardPrivada />
            <CardPrivada />
            <CardPrivada />
            <CardPrivada />
        </div>
    </div>
        );
    };
        
