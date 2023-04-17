import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ message, id }) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>

        <a href={`http://localhost:3000/pokemon/${id}`}>Aceptar</a>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
