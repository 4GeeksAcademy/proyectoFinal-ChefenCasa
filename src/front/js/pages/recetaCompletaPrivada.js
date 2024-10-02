import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { NavbarPrivado } from "../component/Navbar/navbarPrivado";
import "../../styles/recetaCompleta.css"
import { NotaModal } from "../component/notaModal";
import { DropMenuSemanal } from "../component/dropMenuSemanal";
import { useParams } from "react-router-dom";

export const RecetaCompletaPrivada = () => {
  const { store, actions } = useContext(Context)

  const { recetaId } = useParams()

  //me traigo la receta, filtro por id 
  const receta = store.recetas.find(rec => rec.id.toString() === recetaId);

  console.log('receta', receta)

  return (
    <div>
      <NavbarPrivado />

      <div className="container mt-5">
        <header className="recipe-header text-center mb-4">

        </header>
        <h3>{receta.title}</h3>

        <div className="row recipe-content">
          <div className="ingredientes col-12 col-md-4 p-4 rounded">
            <h4>Ingredientes</h4>
            <ul>
              <li>Ingredientes api</li>
            </ul>
            <div className="preparation-time ">
              <p className="mb-0 ms-2">Tiempo de preparación:</p>
              <i className="fa-regular fa-clock"></i>
              <span className="ms-2">20 minutos</span>
            </div>
          </div>

          <div className="col-10 col-md-6  rounded">
            <h4>Preparación</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetu adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
            </p>
          </div>
        </div>

        <div className="text-center mt-3 buttonBottom">
          <button className="btn-receta" data-bs-toggle="modal" data-bs-target="#noteModal">Agregar nota</button>

          <DropMenuSemanal recetaId={receta.id} />

        </div>

        <div className="row note-section ">
          <div className="col-12 col-md-4 p-4">
            <img src="https://assets.teenvogue.com/photos/5ab665d06d36ed4396878433/master/pass/GettyImages-519526540.jpg" alt="Imagen receta" className="img-fluid rounded receta-img" />
          </div>


        </div>
        <NotaModal />

      </div>
    </div>
  )
}