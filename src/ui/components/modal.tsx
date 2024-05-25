import React from 'react';
import './modal.css'; 
import { AiOutlineClose, AiOutlineSetting } from 'react-icons/ai'; 
import { useCliente } from '@/core/helpes/UserContext';

interface ModalProps {
  onClose: () => void;
  handleLogout: () => void;
  profilePhoto: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, handleLogout, profilePhoto }) => {
  const { user, avatar_user } = useCliente();

  const handleLogoutClick = () => {
    handleLogout();
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); 
    }
  };

  const cleanedAvatar = avatar_user.replace(/^"|"$/g, '');

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}><AiOutlineClose /></button> 
        <text className="emailModal" style={{color:'black'}}> {user.email} </text>
        <img src={cleanedAvatar ?  cleanedAvatar : profilePhoto } alt="Profile" className="modal-profile-image" />
        <h2 className="modal-title">
          <text style={{color:'black'}}> Olá, {user?.name} </text>
        </h2>
        <button className="modal-manage-btn">
          <AiOutlineSetting style={{ marginRight: '5px' }} /> Gerenciar sua Conta RACCA
        </button>
        <p style={{color:'black', fontWeight:300}}>
          Aqui ainda vamos definir o que vamos colocar
        </p>
        <div className="modal-buttons">
          <a className="modal-logout-btn" onClick={handleLogoutClick}>Sair</a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
