import React, { useState } from 'react';
import './modal.css'; 
import { AiOutlineClose, AiOutlineSetting } from 'react-icons/ai'; 
import { useCliente } from '@/core/helpes/UserContext';

import EditProfileModal  from "./EditProfileModal";
import { useRouter } from 'next/navigation';

interface ModalProps {
  onClose: () => void;
  handleLogout: () => void;
  profilePhoto: string;
  user: any;
  avatar: any
}

const Modal: React.FC<ModalProps> = ({ onClose, handleLogout, profilePhoto, user, avatar }) => {
  
  const [modal, setModal] = useState(false)

  const handleLogoutClick = () => {
    handleLogout();
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); 
    }
  };


  const router = useRouter();

  const handlePerfilClick = () => {
    router.push('/meu-perfil');
  };

  return (
    <>
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}><AiOutlineClose /></button> 
        <text className="emailModal" style={{color:'black'}}> {user?.email} </text>
        <img src={avatar ?  avatar : profilePhoto } alt="Profile" className="modal-profile-image" />
        <h2 className="modal-title">
          <text style={{color:'black'}}> Olá, {user?.name} </text>
        </h2>
        <button className="modal-manage-btn" onClick={ handlePerfilClick}>
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
    
    </>
  );
};

export default Modal;
