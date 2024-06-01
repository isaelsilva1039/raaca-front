'use client'
import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import Modal from '../../ui/components/modal';
import './perfil.css';
import { useCliente } from '@/core/helpes/UserContext';
import Image from 'next/image';
import AvatarImage from '@/core/infra/ports/react/componentes/avatar/avatar';

const Perfil = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handlePerfilClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const duration = 300;

  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    transform: 'translateY(-20px)',
    opacity: 0,
  };

  type TransitionStyles = {
    [key: string]: { transform: string; opacity: number };
  };

  const transitionStyles: TransitionStyles = {
    entering: { transform: 'translateY(0)', opacity: 1 },
    entered: { transform: 'translateY(0)', opacity: 1 },
    exiting: { transform: 'translateY(-20px)', opacity: 0 },
    exited: { transform: 'translateY(-20px)', opacity: 0 },
  };
  const { user, token, logout , avatar_user } = useCliente();

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };




  return (
    <div className='container-p'>
      <div className="perfil-container" onClick={handlePerfilClick}>

      <AvatarImage  src={avatar_user}/>
      <text className='textoPerfil' > {user?.name} </text>
      </div>
      <Transition in={modalOpen} timeout={duration}>
        {state => (
          <div className="modal-container" style={{ ...defaultStyle, ...(transitionStyles[state as keyof TransitionStyles] || {}) }}>
            {modalOpen && <Modal onClose={handleCloseModal} handleLogout={handleLogout} profilePhoto="/img/avatar1.png" />}
          </div>
        )}
      </Transition>
    </div>
  );
};

export default Perfil;
