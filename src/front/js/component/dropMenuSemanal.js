import React from "react";
import "../../styles/dropMenuSemanal.css"
export const DropMenuSemanal = () => {
    return (
        <div className="dropdown">
            <button className="btn btn-receta dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Weekly menu
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item">
                    Monday
                    <ul className="submenu">
                        <li><a className="dropdown-item" href="#">Lunch</a></li>
                        <li><a className="dropdown-item" href="#">Dinner</a></li>

                    </ul>
                </li>
                <li className="dropdown-item">
                    Tuesday
                    <ul className="submenu">
                        <li><a className="dropdown-item" href="#">Lunch</a></li>
                        <li><a className="dropdown-item" href="#">Dinner</a></li>
                    </ul>
                </li>
                <li className="dropdown-item">
                    Wednesday
                    <ul className="submenu">
                        <li><a className="dropdown-item" href="#">Lunch</a></li>
                        <li><a className="dropdown-item" href="#">Dinner</a></li>
                    </ul>
                </li>
                <li className="dropdown-item">
                Thursday
                    <ul className="submenu">
                        <li><a className="dropdown-item" href="#">Lunch</a></li>
                        <li><a className="dropdown-item" href="#">Dinner</a></li>
                    </ul>
                </li>
                <li className="dropdown-item">
                Friday                    <ul className="submenu">
                        <li><a className="dropdown-item" href="#">Lunch</a></li>
                        <li><a className="dropdown-item" href="#">Dinner</a></li>
                    </ul>
                </li>
                <li className="dropdown-item">
                Saturday                   
                     <ul className="submenu">
                        <li><a className="dropdown-item" href="#">Lunch</a></li>
                        <li><a className="dropdown-item" href="#">Dinner</a></li>
                    </ul>
                </li>
                <li className="dropdown-item">
                Sunday                   
                     <ul className="submenu">
                        <li><a className="dropdown-item" href="#">Lunch</a></li>
                        <li><a className="dropdown-item" href="#">Dinner</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};
    
