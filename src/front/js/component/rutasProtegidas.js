import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const RutasPrivadas = ({ children }) => {
    const [autenticado, setAutenticado] = useState(false);
    const [cargando, setCargando] = useState(true);
    const { actions } = useContext(Context);
    
    // Usar un flag para verificar si el componente está montado
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                if (isMounted) setAutenticado(false);
                setCargando(false); // Para evitar el bucle de carga
                return;
            }

            const auth = await actions.autentificacion();
            if (isMounted) {
                setAutenticado(auth);
                setCargando(false); // Se debe indicar que ya ha terminado de cargar
            }
        };

        checkAuth();

        // Función de limpieza que se ejecuta al desmontar el componente
        return () => {
            setIsMounted(false); // Cambia el flag a false
        };
    }, [actions]);

    if (cargando) {
        return <div>Cargando...</div>; // Puedes mostrar un loader o similar
    }

    return autenticado ? children : <Navigate to="/iniciarSesion" />;
};