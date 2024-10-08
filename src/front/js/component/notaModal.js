import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/notaModal.css";

export const NotaModal = ({ apiRecetaId, onClose, show }) => {
  const [notaTexto, setNotaTexto] = useState('');
  const [editarNota, setEditarNota] = useState(false);
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const { actions, store } = useContext(Context);
  // Cargar notas del Local Storage al abrir el modal

  useEffect(() => {
    console.log('apiRecetaId', apiRecetaId)
    actions.obtenerNotas(apiRecetaId);
    let notas = localStorage.getItem('notas');

    if (notas !== null && notas.length > 0) {
      setNotaTexto(notas);
      setEditarNota(true);

    }
    else {
      setEditarNota(false)
    }
  }, []);

  // Manejar agregar o modificar nota
  const handleNota = () => {

    if (!editarNota) {
      actions.agregarNotas(apiRecetaId, notaTexto);
    }
    else {
      actions.modificarNota(apiRecetaId, notaTexto);
    }

    actions.obtenerNotas(apiRecetaId);

    onClose()


  };
  return (
    <div className={showHideClassName + " modal-overlay"}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="noteModalLabel">
            {editarNota ? 'Cambiar nota' : 'Agregar nota'}
          </h5>
          <button type="button" className="btn-close-nota" data-bs-dismiss="modal" aria-label="Cerrar" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="noteText" className="form-label">Escribe tu nota</label>
              <textarea
                className="form-control-nota"
                id="noteText"
                rows="3"
                value={notaTexto}
                placeholder='Write your note here'
                onChange={(e) => setNotaTexto(e.target.value)} // Manejo del cambio
              ></textarea>
            </div>
          </form>
        </div>
        <div className="modal-footer-nota">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Cerrar</button>
          <button type="button" className="btn btn-receta" onClick={handleNota}>
            {editarNota ? 'Cambiar nota' : 'Agregar nota'}
          </button>
        </div>
      </div>
    </div>
  );
};