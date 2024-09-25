import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
import '../../styles/signUp.css'

export const SignUp = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")


	const navigate = useNavigate()
	const handlechange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })

	}
	const handleSubmit = async (email, password) => {

		const signUp = await actions.signUp(email, password)
		if (signUp) {
			alert('usuario registrado con exito')
			navigate('/login')
		}

	}

	return (
		<div className="container">
			<div className="signUp">
				<div className="signUp_screen">
					<div className="app-title">
						<h1>SignUp</h1>
					</div>

					<div className="signUp-form">
						<div className="control-group">
							<input
								type="text"
								className="login-field"
								placeholder="email"
								id="signUp-email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

						</div>

						<div className="control-group">
							<input
								type="password"
								className="signUp-field"
								placeholder="password"
								id="SignUp-pass"
								value={password}
								onChange={(e) => setPassword(e.target.value)}

							/>

						</div>

						<button className="btn btn-primary btn-large btn-block" href="# " onClick={() => handleSubmit(email, password)} >SignUp!</button>


					</div>
				</div>
			</div>
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	)
}