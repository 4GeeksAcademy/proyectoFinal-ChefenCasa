import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import "../../styles/dropMenuSemanal.css"
import { Context } from "../store/appContext";

export const DropMenuSemanal = ({ recetaId }) => {
    const { actions } = useContext(Context);
    const guardarMenu = (dia_semana, tipo_comida) => {
        if (recetaId) { // verifico si existe
            actions.guardarMenu(dia_semana, tipo_comida, recetaId);

        } else {
            console.error("Receta ID no disponible");
        }
    };

    return (
        <div className="btn-group">
            <Link to={`/menuSemanal`}>
                <button type="button" className="btn-weeklyMenu">Weekly Menu</button>
            </Link>
            <button className="btn btn-receta dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item">
                    Monday
                    <ul className="submenu">
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Monday", "Lunch")}>Lunch</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Monday", "Dinner")}>Dinner</a></li>

                    </ul>
                </li>
                <li className="dropdown-item">
                    Tuesday
                    <ul className="submenu">
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Tuesday", "Lunch")}>Lunch</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Tuesday", "Dinner")}>Dinner</a></li>
                    </ul>
                </li>
                <li className="dropdown-item">
                    Wednesday
                    <ul className="submenu">

                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Wednesday", "Lunch")}>Lunch</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Wednesday", "Dinner")}>Dinner</a></li>
                    </ul>
                </li>
                <li className="dropdown-item">
                    Thursday
                    <ul className="submenu">
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Thursday", "Lunch")}>Lunch</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Thursday", "Dinner")}>Dinner</a></li>
                    </ul>
                </li>
                <li className="dropdown-item">
                    Friday                    <ul className="submenu">
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Friday", "Lunch")}>Lunch</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Friday", "Dinner")}>Dinner</a></li>
                    </ul>
                </li>
                <li className="dropdown-item">
                    Saturday
                    <ul className="submenu">
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Saturday", "Lunch")}>Lunch</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Saturday", "Dinner")}>Dinner</a></li>
                    </ul>
                </li>
                <li className="dropdown-item">
                    Sunday
                    <ul className="submenu">
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Sunday", "Lunch")}>Lunch</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => guardarMenu("Sunday", "Dinner")}>Dinner</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

