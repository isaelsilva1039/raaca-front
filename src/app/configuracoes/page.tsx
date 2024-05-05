"use client";
import React, { useState, useEffect } from 'react';
import { FaPen } from "react-icons/fa";
import { useCliente } from '@/core/helpes/UserContext';
import './style.css';

const Configuracoes = () => {
  const [novaFoto, setNovaFoto] = useState<File | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [editandoNome, setEditandoNome] = useState(false);
  const [editandoEmail, setEditandoEmail] = useState(false);
  const [editandoCelular, setEditandoCelular] = useState(false);
  const { user, avatar_user } = useCliente();
  const [fotoPerfil, setFotoPerfil] = useState<string>('');

  useEffect(() => {
    setFotoPerfil(avatar_user); // Definindo a foto de perfil inicial
  }, [avatar_user]);

  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNovaFoto(event.target.files[0]);
    }
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCelularChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCelular(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Dados enviados para o servidor:', {
      novaFoto,
      nome,
      email,
      celular
    });

    setNovaFoto(null);
    setNome('');
    setEmail('');
    setCelular('');
    setEditandoNome(false);
    setEditandoEmail(false);
    setEditandoCelular(false);
  };

  return (
    <div className='configuracaoPerfil'>
      <h1>Meu Perfil</h1>
      <div>
      <div className="fotoPerfil">
  {fotoPerfil ? (
    <img src={fotoPerfil} alt="Foto" />
  ) : (
    <div className="fotoPlaceholder">Foto</div>
  )}
  <label htmlFor="inputFotoPerfil" className="customFileInput">
    <input id="inputFotoPerfil" type="file" onChange={handleFotoChange} style={{ display: 'none' }} />
    <FaPen className="icon" />
    <i className="fa fa-pencil" />
  </label>
</div>

      </div>
      <div>
        <h2>Nome</h2>
        {editandoNome ? (
          <input type="text" value={nome} onChange={handleNomeChange} />
        ) : (
          <p onClick={() => setEditandoNome(true)}>Nome: {nome}</p>
        )}
      </div>
      <div>
        <h2>Email</h2>
        {editandoEmail ? (
          <input type="email" value={email} onChange={handleEmailChange} />
        ) : (
          <p onClick={() => setEditandoEmail(true)}>Email: {email}</p>
        )}
      </div>
      <div>
        <h2>Celular</h2>
        {editandoCelular ? (
          <input type="text" value={celular} onChange={handleCelularChange} />
        ) : (
          <p onClick={() => setEditandoCelular(true)}>Celular: {celular}</p>
        )}
      </div>
      <button onClick={handleSubmit}>Salvar Alterações</button>
      <button onClick={() => console.log()}>
        Alterar Senha
      </button>
    </div>
  );
};

export default Configuracoes;
