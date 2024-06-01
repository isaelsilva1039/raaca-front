// pages/profile.js

'use client';

import React, { useState } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e :any) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // Aqui você pode adicionar a lógica para enviar a nova senha para a API
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.status === 200 || response.status === 201) {
        // Limpar os campos do formulário
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setMessage('Password successfully changed');
      } else {
        const result = await response.json();
        setMessage(result.message || 'Failed to change password');
      }
    } catch (error) {
      setMessage('An error occurred while changing the password');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Configurações de Usuário</h1>
      <form onSubmit={handlePasswordChange}>
        <div>
          <label className={styles.label}>
            Senha atual:
            <input
              className={styles.input}
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Nova senha:
            <input
              className={styles.input}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Confirme nova senha:
            <input
              className={styles.input}
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className={styles.button} type="submit">Salvar</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Profile;
