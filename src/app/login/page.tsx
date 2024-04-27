import React from 'react';
import "./style.css";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="logo">
        <img src="/img/logoagendamento.png" alt="Logo da Empresa" />
      </div>
      <form>
        <div>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Senha" required />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? </p>
      <p><a href= "https://api.whatsapp.com/send?phone=5537999137500&text=Ol%C3%A1,%20tenho%20interesse%20%20na%20RACCA%20SA%C3%9ADE"> Entre em contato com nosso time </a>
        <img className='whats' src="/img/logWhats.png"/>
      </p>
    </div>
  );
}

export default Login;