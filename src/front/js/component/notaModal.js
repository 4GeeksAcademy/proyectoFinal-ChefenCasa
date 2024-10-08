import React, { useContext, useState } from 'react';
import "../../styles/notaModal.css";
import { Context } from '../store/appContext';

export const NotaModal = ({ apiRecetaId }) => {
  const { actions } = useContext(Context);

  const [notaTexto, setNotaTexto] = useState('');
  const [editarNota, setEditarNota] = useState(false);

  const handleNota = () => {
    if (notaTexto.trim() && apiRecetaId) {
      if (editarNota) {
        // Si estamos editando, modificamos la nota existente
        actions.modificarNota(apiRecetaId, notaTexto);
      } else {
        // Si no estamos editando, agregamos una nueva nota
        actions.agregarNotas(apiRecetaId, notaTexto);
      }
    }
  };

  return (
    <div className="modal fade" id="noteModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="noteModalLabel">
              {editarNota ? 'Change note' : 'Add note'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="noteText" className="form-label">Write your note</label>
                <textarea
                  className="form-control"
                  id="noteText"
                  rows="3"
                  value={notaTexto}
                  onChange={(e) => setNotaTexto(e.target.value)} // Corrigiendo aquí
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-receta" onClick={handleNota}>
              {editarNota ? 'Change note' : 'Add note'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
