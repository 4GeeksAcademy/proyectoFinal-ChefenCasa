import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/menu.css";

import { NavbarPrivado } from "../component/Navbar/navbarPrivado";

export const MenuSemanal = () => {
    const { store, actions } = useContext(Context);

    // useefect

    return (
        <div>
            <NavbarPrivado />
            <div className="container mt-5">
                <h2 className="text-center">My Weekly Menu</h2>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10">
                        <div className="row menu-header">
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
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            
                        </div>
                        <div className="row">
                            <div className="col-2 text-center align-middle font-weight-bold">Dinner</div>
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            <div className="col recipe">nombre receta</div>
                            
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};


