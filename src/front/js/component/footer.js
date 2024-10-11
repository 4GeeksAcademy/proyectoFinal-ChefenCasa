import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";


export const Footer = () => {
    return (
        <div className="footer">
            <div className="contenedorCafe">
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