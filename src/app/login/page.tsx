"use client"

import React, { useState } from 'react';

import "./style.css";
import { postLogin } from './postLgin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login: React.FC = () => {


  // Estados para armazenar email e senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [mensagem, setMensagem] = useState('');
  
  // Função para lidar com a submissão do formulário
  const handleSubmit = () => {
    postLogin(
      email,
      senha,
      (data) =>{
        
        if (!data.token){
          setMensagem('Senha errada');

          toast.error('Senha incorreta ou erro de login!');


          return;
        }

        localStorage.setItem('token', data.token); // Armazena o token no localStorage
        localStorage.setItem('user', JSON.stringify(data.user)); // Armazena os dados do usuário no localStorage
        localStorage.setItem('avatar_user', JSON.stringify(data.avatar )); // Armazena os dados do usuário no localStorage

        window.location.href ='/dashboard'

      },
      (erro) => {
        console.log(erro)
      }
    )
  }

  return (
    <div className="login-container">
      <div className="logo">
        <img src="/img/logoagendamento.png" alt="Logo da Empresa" />
      </div>
  
        <div>
          <input 
           id="email"
           type="email"
           placeholder="Digite seu email"
           required
           value={email}
           onChange={(e) => setEmail(e.target.value)}
          />
          <input 
          id="password"
          type="password"
          placeholder="Digite sua senha"
          required
          // value={senha}
          onChange={(e) => setSenha(e.target.value)}

          />
        </div>
        <button onClick={() => handleSubmit()} >Entrar</button>
        
        <ToastContainer />

      <p>Não possue uma conta? </p>
      <p><a href= "https://api.whatsapp.com/send?phone=5537999137500&text=Ol%C3%A1,%20tenho%20interesse%20%20na%20RACCA%20SA%C3%9ADE"> Entre em contato com nosso time </a>
        <img className='whats' src="/img/logWhats.png"/>
      </p>
    </div>
  );
}

export default Login;