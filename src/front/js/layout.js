import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { iniciarSesion } from "./pages/iniciarSesion";
import { Single } from "./pages/single";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signUp";
import { Private } from "./pages/private";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<iniciarSesion />} path="/iniciarSesion" />
                        <Route element={<Single />} path="/single/:theid" />
            
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signUp" />
                        <Route element={<Private />} path="/private" />
                        <Route element={<h1>Not found!</h1>} />
                        
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
