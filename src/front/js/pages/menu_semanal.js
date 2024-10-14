import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import "../../styles/menu.css";

import { NavbarPrivado } from "../component/Navbar/navbarPrivado";

export const MenuSemanal = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {

        actions.obtenerMenu();
    }, []);

    const obtenerRecetaPorDiaYTipo = (dia, tipo) => {
        const recetaMenu = store.menuSemanal?.find((item) => {
            return (
                (item.dia_semana === dia && item.tipo_comida === tipo)
            );
        });

        return recetaMenu ? recetaMenu.receta_title : "No recipe";
    };

    const obtenerIDreceta = (dia, tipo) => {
        const recetaMenu = store.menuSemanal?.find((item) => {
            return (
                (item.dia_semana === dia && item.tipo_comida === tipo)
            );
        });

        return recetaMenu.api_receta_id;
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
        <div className="body-weekly-menu">
            <NavbarPrivado />
            <div className="container mt-5">
                <div>
                    <h2 className="text-center">My Weekly Menu</h2>
                    <div className="row">
                        <div className="col-12">
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
                                <div className="col title lunch">Lunch</div>


                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Monday", "Lunch")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Monday", "Lunch")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Tuesday", "Lunch")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Tuesday", "Lunch")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Wednesday", "Lunch")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Wednesday", "Lunch")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Thursday", "Lunch")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Thursday", "Lunch")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Friday", "Lunch")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Friday", "Lunch")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Saturday", "Lunch")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Saturday", "Lunch")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Sunday", "Lunch")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Sunday", "Lunch")}</div>
                            </div>

                            <div className="row">
                                <div className="col title dinner">Dinner</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Monday", "Dinner")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Monday", "Dinner")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Tuesday", "Dinner")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Tuesday", "Dinner")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Wednesday", "Dinner")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Wednesday", "Dinner")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Thursday", "Dinner")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Thursday", "Dinner")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Friday", "Dinner")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Friday", "Dinner")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Saturday", "Dinner")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Saturday", "Dinner")}</div>
                                <div onClick={() => navigate(`/recetaCompletaPrivada/${obtenerIDreceta("Sunday", "Dinner")}`)} className="col recipe">{obtenerRecetaPorDiaYTipo("Sunday", "Dinner")}</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};


