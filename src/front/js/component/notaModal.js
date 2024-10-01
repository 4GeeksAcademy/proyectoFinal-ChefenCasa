import React from 'react';
import "../../styles/notaModal.css"

export const NotaModal = () => {
  return (
    <div className="modal fade" id="noteModal" >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="noteModalLabel">Agregar Nota</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="noteText" className="form-label">Escribe tu nota</label>
                <textarea className="form-control" id="noteText" rows="3" placeholder="Puedes escribir tu nota aquí..."></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-receta">Guardar Nota</button>
          </div>
        </div>
      </div>
    </div>
  );
};


