import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar ">
			<div className="container-fluid">
				<div className="ml-auto">
					<Link  className="enlaces"to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
					<Link className="enlaces" to="/signup">
						<button className="btn btn-primary">Signup</button>
					</Link>
				</div>
			</div>
		</nav>
	);

};