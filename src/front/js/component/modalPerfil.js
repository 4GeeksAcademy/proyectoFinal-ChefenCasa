import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/modal.css'
import { useNavigate } from 'react-router-dom';
import { ModalSesion } from "./modalSesion";

export const ModalPerfil = ({ show, onClose }) => {
    const { store, actions } = useContext(Context);
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    //controlo si los inputs name/email son editables
    const [edit, setEdit] = useState(false);
    

    const [email, setEmail] = useState(localStorage.getItem('user_email'))
    const [name, setName] = useState(localStorage.getItem('user_name'))
    

    const handleEnableEdit = () => {
        setEdit(true);
    };

    const modificarusuario = async (e) => {
        e.preventDefault()

        const userModificar = await actions.modificar(localStorage.getItem('user_id'), name, email);
        alert("Successfully modified data")
        
        onClose()
        setEdit(false)// cuando edita, que el estado de edit vuelva a estar false y no se pueda editar a no ser que de a click 

    }

    return (
        <div className={showHideClassName + " modal-overlay"}>
        <section className="modal-main">
            <button className="close-button" onClick={onClose}>
                &times;
            </button>
            <p>Profile</p>
            <form onSubmit={modificarusuario}>
                <label>Name</label>
                <input
                    type="text"
                    className="login-field"
                    placeholder="Write your name"
                    required
                    id="signUp-name"
                    value={name}
                    disabled={!edit} // Deshabilitado si no es editable
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="text"
                    className="login-field"
                    placeholder="Write your email"
                    required
                    id="signUp-email"
                    value={email}
                    disabled={!edit} // Deshabilitado si no es editable
                    onChange={(e) => setEmail(e.target.value)}
                />
               {!edit && (
                        <h6>
                            If you want to update the data,{" "}
                            <span
                                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                onClick={handleEnableEdit}
                            >
                                click here
                            </span>
                        </h6>
                    )}
                
                { edit && (
                    <button className="btn-modal" type="submit" >
                    Change
                </button>
                )
                    
                }
                
            </form>
        </section>
    </div>
);
};
