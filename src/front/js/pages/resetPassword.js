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
                    <form>
                        <label>New Password:</label>
                        <div className="form-row">
                            <div>
                                <input className="form-control" type="password" name="password" id="password"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
