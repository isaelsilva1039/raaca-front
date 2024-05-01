// Modal.jsx
import React from 'react';
import './modal.css'; 
import { useCliente } from '@/core/helpes/UserContext';

interface ModalProps {
  onClose: () => void;
  handleLogout: () => void;
  profilePhoto: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, handleLogout, profilePhoto }) => {

    const { user, token, logout , avatar_user } = useCliente();

  const handleLogoutClick = () => {
    handleLogout();
    onClose();
  };


  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); 
    }
  };

  // Remove as aspas da string se estiverem presentes
const cleanedAvatar = avatar_user.replace(/^"|"$/g, '');


  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
    
      <div className="modal-content">
        <img src={cleanedAvatar ?  cleanedAvatar : profilePhoto } alt="Profile" className="modal-profile-image" />
        <h2 className="modal-title">
          <text style={{color:'black'}}> Olá, {user?.name} </text></h2>
        <p  style={{color:'black', fontWeight:300}}>
          Aqui ainda vamos definir oque vamos colocar
        </p>
        <a className="modal-logout-btn" onClick={handleLogoutClick}>Sair</a>
      </div>
    </div>
  );
};

export default Modal;
