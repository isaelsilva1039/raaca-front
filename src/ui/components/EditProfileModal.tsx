import React, { useState } from 'react';
// import './styles/modal.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; email: string; password: string; photo: string }) => void;
};

const EditProfileModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSave = () => {
    onSave({ name, email, password, photo });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Edit Profile</h2>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="text" placeholder="Photo URL" value={photo} onChange={e => setPhoto(e.target.value)} />
        <button className="modal-save" onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditProfileModal;
