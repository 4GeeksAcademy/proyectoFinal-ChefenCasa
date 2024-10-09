import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import '../../styles/modal.css';

export const ForgottenPassword = ({ show, onClose }) => {

    const { actions } = useContext(Context);
    const [emailValor, setEmailValor] = useState("");
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.solicitarMailRecuperacion();  // Llamamos a la función con el email
        onClose();  // Cerramos el modal después de enviar
    };

    return (
        <>
            <div className={showHideClassName + " modal-overlay"}>
                <section className="modal-main">
                    <button className="close-button" onClick={onClose}>&times;</button>
                    <p>Escribe el email con el que te has registrado</p>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input
                            
                            type="text"
                            className="login-field"
                            id="email"   
                            placeholder="Ingresa tu email"
                            required
                        />
                        <button className="btn-modal" type="submit">Enviar</button>
                        
                    </form>
                </section>
            </div>

        </>
    );
}