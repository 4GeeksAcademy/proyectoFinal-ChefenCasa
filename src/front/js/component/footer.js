import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import Logo from "../../img/logo_solo.png";

export const Footer = () => {
    return (
        <div className="footer">
            <div>
                <img className="logoFooter" src={Logo} alt="Logo Chef at Home" />
            </div>
            <div className="contenedorCafe">
                <p className="textoCafe">
                    <i className="fas fa-heart"></i> &nbsp;
                    If you want to help us, <br /> you can invite us to a coffee here &nbsp;
                    <i className="fas fa-heart"></i>
                </p>
                <a href='https://cafecito.app/chefathome' rel='noopener' target='_blank' className="cafecito">
                    <img
                        srcSet='https://cdn.cafecito.app/imgs/buttons/button_1.png 1x, https://cdn.cafecito.app/imgs/buttons/button_1_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_1_3.75x.png 3.75x'
                        src='https://cdn.cafecito.app/imgs/buttons/button_1.png'
                        alt='Invitame un café en cafecito.app'
                    />
                </a>
            </div>
        </div>
    );
};