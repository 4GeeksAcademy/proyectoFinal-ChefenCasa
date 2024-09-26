import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/modal.css';
import { useNavigate } from 'react-router-dom';



export const ModalRegister = ({ show, onClose }) => {

    const { store, actions } = useContext(Context);
    const showHideClassName = show ? "modal display-block" : "modal display-none";


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")


    const navigate = useNavigate()
    const signUp = async () => {
        const signUpProcess = await actions.signUp(email, password, name)
        if (signUpProcess) {
            alert('usuario registrado con exito')
            navigate('/login')
        }

    }
    return (
        <div className={showHideClassName + " modal-overlay"}>
            <section className="modal-main">
               
                <p>Sign Up</p>
                <form onSubmit={signUp}>
                    <label >Name</label>
                    <input
                        type="text"
                        className="login-field"
                        placeholder="Write your name"
                        required
                        id="name"
                        value={name}

                        onChange={(e) => setEmail(e.target.value)}
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



                    <label >Password</label>
                    <input
                        type="password"
                        className="login-field"
                        placeholder="Write your password"
                        required
                        id="SignUp-pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />


                </form>
                <button  className="btn-modal" type="submit" onClick={signUp}>
                    Sign up
                </button>
            </section>
        </div>
    );
};