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
      <p>Cadastre-se</p>
    </div>
  );
}

export default Login;