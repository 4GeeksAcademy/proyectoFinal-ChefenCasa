import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { iniciarSesion } from "./pages/iniciarSesion";
import { Single } from "./pages/single";

import { VistaPrivada } from "./pages/vistaPrivada";
import { VistaPublica } from "./pages/vistaPublica";
import {RecetaCompletaPublica} from "./pages/recetaCompletaPublica"
import { RecetaCompletaPrivada } from "./pages/recetaCompletaPrivada";
import { RutasPrivadas } from "./component/rutasPrivadas";

import { CardPrueba } from "./pages/card_prueba";
import { CardPrivada } from "./component/cardPrivada";

import injectContext from "./store/appContext";
import { MenuSemanal } from "./pages/menu_semanal";



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
                        <Route element={<RutasPrivadas><VistaPrivada /></RutasPrivadas>} path="/vistaPrivada" />
                        <Route element={<VistaPublica />} path="/vistaPublica" />
                        <Route element={<RecetaCompletaPrivada />} path="/recetaCompletaPrivada" />
                        <Route element={<RecetaCompletaPublica />} path="/recetaCompletaPublica" />
                        <Route element={<MenuSemanal />} path="/menuSemanal" />

                        <Route element={<CardPrueba />} path="/cardPrueba" />
                        <Route element={<CardPrivada />} path="/cardPrivada" />

                        <Route element={<h1>Not found!</h1>} />
                        
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
