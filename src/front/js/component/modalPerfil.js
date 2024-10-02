import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/modal.css'
import { useNavigate } from 'react-router-dom';
import { ModalSesion } from "./modalSesion";

export const ModalPerfil = ({ show, onClose }) =>{
    const { store, actions } = useContext(Context);
    const showHideClassName = show ? "modal display-block" : "modal display-none";


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    return (
       
            <div className={showHideClassName + " modal-overlay"}>
                <section className="modal-main">
                <button className="close-button" onClick={onClose}>
                        &times; 
                    </button>
                    <p>Profile</p>
                    <form >
                        <label >Name</label>
                        <input
                            type="text"
                            className="login-field"
                            placeholder="Write your name"
                            required
                            id="signUp-name"
                           // value={name}
    
                            //onChange={(e) => setName(e.target.value)}
                        />
                        <label >Email</label>
                        <input
                            type="text"
                            className="login-field"
                            placeholder="Write your email"
                            required
                            id="signUp-email"
                           // value={email}
                           // onChange={(e) => setEmail(e.target.value)}
                        />
    
    
    
                        <label >Password</label>
                        <input
                            type="password"
                            className="login-field"
                            placeholder="Write your password"
                            required
                            id="SignUp-pass"
                           // value={password}
                           // onChange={(e) => setPassword(e.target.value)}
    
                        />
    
    
                    </form>
                    <button className="btn-modal" type="submit" >
                      Change
                    </button>
                </section>
            </div>
        );
    };
    