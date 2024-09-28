import React, { useState, useContext,useEffect } from "react";
import { Context } from "../store/appContext";
import '../../styles/modal.css'
import { useNavigate } from 'react-router-dom';


export const ModalSesion = ({ show, onClose }) => {

    const { store, actions } = useContext(Context);
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const [emailValor, setEmailtValor] = useState('');
    const [passValor, setPassValor] = useState('');
    const [data, setData] = useState()
    
    const navigate = useNavigate();

    const [montado,setMontado]=useState(true)

    useEffect(() => {
        
        return () => {
            setMontado(false);
        };
    }, []);

    const login = async (e) => {
        e.preventDefault()
        const data = {
            "email": emailValor,
            "password": passValor
        }
        const userLogin = await actions.login(data);
        
        if(montado){ //solo lo actualiza si tengo el componente montado
            if (userLogin) {
                navigate('/vistaPrivada')
            } else {
                alert('Usuario o contraseña incorrectos');
            }
    
            setEmailtValor('');
            setPassValor('');
        }
        
        };
        

    return (
        <div className={showHideClassName + " modal-overlay"}>
            <section className="modal-main">
                <p>LOGIN</p>
                <form onSubmit={login}>
                    <label>Email</label>
                    <input
                        type="text"
                        className="login-field"
                        placeholder="Write your email"
                        required
                        id="login-email"
                        value={emailValor}
                        onChange={(e) => setEmailtValor(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        className="login-field"
                        placeholder="Write your password"
                        required
                        id="login-pass"
                        value={passValor}
                        onChange={(e) => setPassValor(e.target.value)}
                    />

                    <button className="btn-modal" type="submit">
                        Sign in
                    </button>
                </form>
            </section>
        </div>
    );
};
