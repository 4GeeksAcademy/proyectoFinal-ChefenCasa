import React,{useContext, useState} from 'react';
import { Context } from '../store/appContext';
import "../../styles/notaModal.css"

export const NotaModal = ({ existingNote }) => {

  const {actions, store} = useContext(Context)

 


  return (
    <div className="modal fade" id="noteModal" >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="noteModalLabel">
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">NOTE</button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="noteText" className="form-label">Escribe tu nota</label>
                <textarea 
                className="form-control" 
                id="noteText" rows="3" 
                placeholder="Puedes escribir tu nota aquí..."
                
                
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-receta" >
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


