// Modal.jsx
import React from 'react';
import './modal.css'; 

interface ModalProps {
  onClose: () => void;
  handleLogout: () => void;
  profilePhoto: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, handleLogout, profilePhoto }) => {
  const handleLogoutClick = () => {
    handleLogout();
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); 
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
    
      <div className="modal-content">
        <img src={profilePhoto} alt="Profile" className="modal-profile-image" />
        <h2 className="modal-title">Olá, Usuário!</h2>
        <p className="modal-description">
          Aqui ainda vamos definir oque vamos colocar
        </p>
        <a className="modal-logout-btn" onClick={handleLogoutClick}>Sair</a>
      </div>
    </div>
  );
};

export default Modal;
