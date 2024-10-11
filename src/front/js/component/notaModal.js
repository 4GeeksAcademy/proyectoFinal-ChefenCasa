import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/notaModal.css";

export const NotaModal = ({ apiRecetaId, onClose, show, notaTexto, setNotaTexto }) => {
  // const [notaTexto, setNotaTexto] = useState('');
  const [editarNota, setEditarNota] = useState(false);
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const { actions, store } = useContext(Context);
  // Cargar notas del Local Storage al abrir el modal

  useEffect(() => {
    console.log('apiRecetaId', apiRecetaId)
    actions.obtenerNotas(apiRecetaId);
    let notas = localStorage.getItem(`notas${apiRecetaId}`);

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
      <section className="modal-main">
        <button className="close-button" onClick={onClose}>&times;</button>

        <div>
          <h5 className="modal-title" id="noteModalLabel">
            Note
          </h5>
          <textarea
            type="text"
            className="login-field"
            placeholder='Write your note here'
            required
            value={notaTexto}
            onChange={(e) => setNotaTexto(e.target.value)}
          ></textarea>
        </div>

        <button type="button" className="btn btn-receta" onClick={handleNota}>
          {editarNota ? 'Change Note' : 'Add note'}
        </button>
      </section>
    </div>



  );
};