import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/Navbar/navbar";
import "../../styles/resetPassword.css";


export const ResetPassword = () => {
    const { store, actions } = useContext(Context);
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword === repeatPassword) {
            const token = new URLSearchParams(window.location.search).get("token"); 
            console.log("window.location.search:", window.location.search);
            console.log("Token capturado:", new URLSearchParams(window.location.search).get("token"));
            console.log(token);

            await actions.resetPassword(token, newPassword);
        } else {
            alert("Passwords do not match.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="vistaResetPassword">
                <div className="resetPasswordContenedor">
                    <h2 className="titlePassword">Reset your password</h2>
                    <form className="inputResetPassword" onSubmit={handleSubmit}>
                        <p style={{ fontSize: "medium" }}> New password </p>
                        <input type="password" name="password" id="password1" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <p style={{ fontSize: "medium" }}> Repeat password </p>
                        <input type="password" name="password" id="password2" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                        <button type="submit" className="submitButton">Reset</button>
                    </form>
                </div>
            </div>
           
        </div>
    );
};