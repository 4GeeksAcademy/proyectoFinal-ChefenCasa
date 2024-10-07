import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/Navbar/navbar";
import "../../styles/resetPassword.css";

export const ResetPassword = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <Navbar />
            <div className="vistaResetPassword">
                <div className="resetPasswordContenedor">
                    <h2 className="titlePassword">Reset your password</h2>
                    <form className="inputResetPassword">
                        <p style={{ fontSize: "large" }}> New password </p>
                        <input type="password" name="password" id="password1"/>
                        <p style={{ fontSize: "large" }}> Repeat password </p>
                        <input type="password" name="password" id="password2"/>
                        <button type="submit" className="submitButton">Reset</button>
                    </form>
                </div>
            </div>
        </div>
    );
};