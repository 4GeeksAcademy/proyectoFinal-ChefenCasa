import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/modal.css';
import { useNavigate } from 'react-router-dom';
import { ModalRegistro } from '../component/modalRegistro';

export const ModalSesion = ({ show, onClose }) => {
    const { store, actions } = useContext(Context);
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [emailValor, setEmailtValor] = useState('');
    const [passValor, setPassValor] = useState('');
    const navigate = useNavigate();

    // Estado para controlar la visibilidad del modal de registro
    const [showRegistro, setShowRegistro] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        const data = { "email": emailValor, "password": passValor };
        const userLogin = await actions.login(data);
        if (userLogin) {
            navigate('/vistaPrivada');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    // Función para manejar el clic en "click here"
    const handleClickHere = () => {
        onClose(); // Cierra el modal de sesión
        setShowRegistro(true); // Abre el modal de registro
    };

    return (
        <>
            <div className={showHideClassName + " modal-overlay"}>
                <section className="modal-main">
                    <button className="close-button" onClick={onClose}> &times; </button>
                    <p>Log in</p>
                    <form onSubmit={login}>
                        <label>Email</label>
                        <input type="text" className="login-field" placeholder="Write your email" required id="login-email" value={emailValor} onChange={(e) => setEmailtValor(e.target.value)} />
                        <label>Password</label>
                        <input type="password" className="login-field" placeholder="Write your password" required id="login-pass" value={passValor} onChange={(e) => setPassValor(e.target.value)} />
                        <h6>If you are not registered, 
                            <button type="button" className="botonClickHere" onClick={handleClickHere}>click here</button>
                        </h6>
                        <button className="btn-modal" type="submit"> Login </button>
                    </form>
                </section>
            </div>

            {/* Renderiza el ModalRegistro si showRegistro es true */}
            {showRegistro && (
                <ModalRegistro show={showRegistro} onClose={() => setShowRegistro(false)} />
            )}
        </>
    );
};