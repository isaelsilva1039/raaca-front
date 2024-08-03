'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import Modal from '../../ui/components/modal';
import './perfil.css';
import { useCliente } from '@/core/helpes/UserContext';
import AvatarImage from '@/core/infra/ports/react/componentes/avatar/avatar';
import { getVerificarAgendasLiberadas } from '../api/horarios/getVerificarAgendasLiberadas';
import { Avatar } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AvatarPlaceholder from '@/core/infra/ports/react/componentes/AvatarPlaceholder/AvatarPlaceholder';


const Perfil = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handlePerfilClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalOpen(false);
    }
  };

  const [usuarioCliente, setUsuarioCliente] = useState<any>();

  const [loading, setLoading] = useState<Boolean>(true);
  const [updateCliente, setUpdateCliente] = useState<Boolean>(false);

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);

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

  const { user, token, logout, avatar_user } = useCliente();



  const getMe = () => {
    if (!token) return;

    const onFetchSuccess = (data: any) => {
      setUsuarioCliente(data?.user);
      setLoading(false);
    };

    const onFetchError = (error: any) => {
      setLoading(false);
    };
    /*** Reaproveitando o mesmo metodo, por isso tem esse nome extranho, porque é usando em varioslocais */
    getVerificarAgendasLiberadas(token, onFetchSuccess, onFetchError);
  };


  useEffect(() => {

    if(updateCliente){
      getMe()
    }
    
  },[updateCliente])


  useEffect(() => {
    getMe()
  },[])

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className='container-p'>
      <div className="perfil-container" onClick={handlePerfilClick}>
      {loading ? (
          <Skeleton circle={true} height={50} width={50} />
        ) : (

          <AvatarPlaceholder
          avatarUrl={usuarioCliente?.avatar}
          name={usuarioCliente?.name || "Desconhecido"}
          className="avatar"

        />
        )}
        {loading ? (
          <Skeleton width={100} />
        ) : (
          <text className='textoPerfil'>{usuarioCliente?.name}</text>
        )}
      </div>
      <Transition in={modalOpen} timeout={duration}>
        {state => (
          <div
            className="modal-container"
            ref={modalRef}
            style={{ ...defaultStyle, ...(transitionStyles[state as keyof TransitionStyles] || {}) }}
            onClick={e => e.stopPropagation()}
          >
            {modalOpen && <Modal user={usuarioCliente} avatar={usuarioCliente?.avatar} onClose={handleCloseModal} handleLogout={handleLogout} profilePhoto="/img/avatar1.png" />}
          </div>
        )}
      </Transition>
      {modalOpen && <div onClick={handleCloseModal} className="click-outside" />}
    </div>
  );
};

export default Perfil;
