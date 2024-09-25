import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="body">
			<div className="descriptionHome">
				<h1>All the food for the week in one place</h1>
				<br></br>
				<h4>Chef at Home transforms the way to explore, plan, and organize gourmet recipes.</h4>
				<br></br>
				<h4>Save your favorite recipes, add personalized notes, and organize your weekly menu.</h4>
			</div>
		</div>
	);
};
