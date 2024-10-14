import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { NavbarPrivado } from "../component/Navbar/navbarPrivado";
import "../../styles/recetaCompleta.css"
import { DropMenuSemanal } from "../component/dropMenuSemanal";
import { useParams } from "react-router-dom";


export const RecetaCompletaPrivada = () => {
  const { store, actions } = useContext(Context)

  const { recetaId } = useParams()
  const [receta, setReceta] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const recetaApi = await actions.obtenerRecetaIndividual(recetaId);
      setReceta(recetaApi[0])
    }
    fetchData();
  }, []);


  //me traigo la receta, filtro por id 
  //const receta = store.recetas.find(rec => rec.id.toString() === recetaId);
  console.log(receta)
  if (!receta) {
    return (<h1>No hay recetas</h1>)
  }
  return (
    <div className="bodyRecetaPrivada">

      <NavbarPrivado />
      <div className="tituloRecetaCompleta">
        <h3>{receta?.title}</h3>
      </div>

      <div className="contenidoRecetaCompleta">

        <div className="imagenBotonRecetaCompleta">
          <div>
            <img src={receta.image} alt={receta.title} className="ImagenRecetaCompleta" />
          </div>
          <div className="botonDropdownMenuRecetaCompleta">
            <DropMenuSemanal recetaId={receta.id} />
          </div>
        </div>

        <div className="contenedorIngredientesYPreparacion">

          <div className="ingredientesRecetaCompleta">
            <div className="tituloIngredientesRecetaCompleta">
              <p><strong> Ingredients<br /></strong></p>
              <ul>
                {receta.ingredientes && receta.ingredientes.length > 0 ? receta.ingredientes.map((ingrediente, index) => (
                  <li key={index}>{ingrediente.ingrediente}</li>
                )) : 'Ingredients are not available'}
              </ul>
            </div>
            <div className="tiempoDePreparacionRecetaCompleta">
              <p className="iconoRelojRecetaCompleta"> <i className="far fa-clock"></i> {receta.tiempo_de_coccion}</p>
            </div>
          </div>

          <div className="contenedorPreparacion">
            <p className="preparacion">
              {receta.pasos && receta.pasos.length > 0 ? receta.pasos.map((paso, index) => (
                <span key={index}>
                  - Step {index + 1}: {paso.step} <br />
                </span>
              )) : 'Steps are not available'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}