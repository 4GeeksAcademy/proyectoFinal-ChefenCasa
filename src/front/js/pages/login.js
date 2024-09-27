import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";


export const Login = () => {
	const { store, actions } = useContext(Context);

	const navigate = useNavigate()

	const [emailValor, setEmailtValor] = useState('')
	const [passValor, setPassValor] = useState('')
	const [data, setData] = useState()

	const handlechangeEmail = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
		setEmailtValor(e.target.value)

	}
	const handlechangePass = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
		setPassValor(e.target.value)

	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setPassValor('')
		setEmailtValor('')
		const userLogin = await actions.login(data)
		if (userLogin) {
			navigate('/private')


		}
		else {
			alert('Usuario o contraseña incorrectos')

		}

	}

	return (
		<div className="container">
			<div className="login">
				<div className="login-screen">
					<div className="app-title">
						<h2>USER LOGIN</h2>
					</div>

					<div className="login-form">
						<div className="control-group">
							<input
								type="text"
								className="login-field"
								placeholder="email"
								id="login-name"
								name="email"
								onChange={(e) => handlechangeEmail(e)}
								value={emailValor}
							/>
							<label className="login-field-icon fui-user" htmlFor="login-name"></label>
						</div>

						<div className="control-group">
							<input
								type="password"
								className="login-field"
								placeholder="password"
								id="login-pass"
								name="password"
								onChange={(e) => handlechangePass(e)}
								value={passValor}
							/>
							<label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
						</div>

						<button className="btn btn-primary btn-large btn-block" onClick={handleSubmit} >login</button>

					</div>
				</div>
			</div>
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};