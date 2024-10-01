import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/modal.css'
import { useNavigate } from 'react-router-dom';
import { ModalSesion } from "./modalSesion";

export const ModalPerfil = ({ show, onClose }) => {
    const { store, actions } = useContext(Context);
    const showHideClassName = show ? "modal display-block" : "modal display-none";


    const [email, setEmail] = useState(localStorage.getItem('user_email'))
    const [name, setName] = useState(localStorage.getItem('user_name'))

    const modificarusuario = async (e) => {
        e.preventDefault()

        const userModificar = await actions.modificar(localStorage.getItem('user_id'), name, email);
        alert(userModificar.msg)
        onClose()

    }

    return (

        <div className={showHideClassName + " modal-overlay"}>
            <section className="modal-main">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <p>Profile</p>
                <form onSubmit={modificarusuario}>
                    <label >Name</label>
                    <input
                        type="text"
                        className="login-field"
                        placeholder="Write your name"
                        required
                        id="signUp-name"
                        value={name}

                        onChange={(e) => setName(e.target.value)}
                    />
                    <label >Email</label>
                    <input
                        type="text"
                        className="login-field"
                        placeholder="Write your email"
                        required
                        id="signUp-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />


                    <button className="btn-modal" type="submit" >
                        Change
                    </button>
                </form>

            </section>
        </div>
    );
};
