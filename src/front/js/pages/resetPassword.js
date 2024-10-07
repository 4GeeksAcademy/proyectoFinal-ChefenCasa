import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/Navbar/navbar";
import { useNavigate } from "react-router-dom";

import "../../styles/resetPassword.css"

export const ResetPassword = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            < Navbar />
            <div className="vistaResetPassword">
                <div className="resetPasswordContenedor">
                    <form className="inputResetPassword">
                        <p style={{ fontSize: "large" }}> New Password: </p>
                        <input className="inputPassword" type="password" name="password" id="password"/>
                    </form>
                    <form className="inputResetPassword">
                        <p style={{ fontSize: "large" }}> Repeat Password: </p>
                        <input className="inputPassword" type="password" name="password" id="password"/>
                    </form>
                </div>
            </div>
        </div>
    );
};
