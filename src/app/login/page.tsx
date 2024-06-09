"use client"

import React, { useState } from 'react';
import Head from 'next/head';
import "./style.css";
import { postLogin } from './postLgin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  
  const handleSubmit = () => {
    postLogin(
      email,
      senha,
      (data) => {
        if (!data.token) {
          setMensagem('Senha errada');
          toast.error('Senha incorreta ou erro de login!');
          return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('avatar_user', JSON.stringify(data.avatar));
        window.location.href = '/dashboard';
      },
      (erro) => {
        console.log(erro);
      }
    );
  }

  return (
    <div className="content-login">
      <Head>
        <title>Login - Racca Saude</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/img/ico512.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Entrar</button>
        
        <ToastContainer />

        <p>Não possui uma conta? </p>
        <p>
          <a href="https://api.whatsapp.com/send?phone=5537999137500&text=Ol%C3%A1,%20tenho%20interesse%20%20na%20RACCA%20SA%C3%9ADE">
            Entre em contato com nosso time
          </a>
          <img className='whats' src="/img/logWhats.png" alt="WhatsApp"/>
        </p>
      </div>
    </div>
  );
}

export default Login;
