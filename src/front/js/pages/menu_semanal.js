import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/menu.css";

import { NavbarPrivado } from "../component/Navbar/navbarPrivado";

export const MenuSemanal = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {

        actions.obtenerMenu();
    }, []);

    const obtenerRecetaPorDiaYTipo = (dia, tipo) => {
        const recetaMenu = store.menuSemanal?.find((item) => {
            return (
                (item.dia_semana === dia && item.tipo_comida === tipo)
            );
        });

        return recetaMenu ? recetaMenu.receta_title : "Sin receta";
    };
    
    const handleRecetaChange = async (dia, tipo, api_receta_id) => {
        
        setSelectedRecetas((prevState) => ({
            ...prevState,
            [`${dia}-${tipo}`]: api_receta_id,
        }));

        // Guarda la receta en el menú
        await actions.guardarMenu(dia, tipo, api_receta_id);
    };

    return (
        <div>
            <NavbarPrivado />
            <div className="container mt-5">
                <h2 className="text-center">My Weekly Menu</h2>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10">
                        <div className="row menu-header">
                        <div className="col menu-day"></div>
                            <div className="col menu-day">Monday</div>
                            <div className="col menu-day">Tuesday</div>
                            <div className="col menu-day">Wednesday</div>
                            <div className="col menu-day">Thursday</div>
                            <div className="col menu-day">Friday</div>
                            <div className="col menu-day">Saturday</div>
                            <div className="col menu-day">Sunday</div>
                        </div>
                        <div className="row">
                         <div className="col-2 text-center align-middle font-weight-bold">Lunch</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Monday", "Lunch")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Tuesday", "Lunch")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Wednesday", "Lunch")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Thursday", "Lunch")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Friday", "Lunch")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Saturday", "Lunch")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Sunday", "Lunch")}</div>
                            
                        </div>
                        <div className="row">
                            <div className="col-2 text-center align-middle font-weight-bold">Dinner</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Monday", "Dinner")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Tuesday", "Dinner")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Wednesday", "Dinner")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Thursday", "Dinner")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Friday", "Dinner")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Saturday", "Dinner")}</div>
                            <div className="col recipe">{obtenerRecetaPorDiaYTipo("Sunday", "Dinner")}</div>
                            
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};


