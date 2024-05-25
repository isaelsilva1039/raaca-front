import React, { useState, useEffect } from 'react';

const formContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  border: '2px solid #a500f7',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const formRowStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '20px',
};

const labelStyles = {
  marginRight: '10px',
  fontWeight: 'bold',
};

const inputStyles = {
  flex: '1',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const textareaStyles = {
  flex: '1',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  height: '100px',
};

const buttonContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const buttonStyles = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
};

const saveButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#a500f7',
  color: '#fff',
  marginRight: '10px',
};

const cancelButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#dc3545',
  color: '#fff',
};

const PlanForm = ({ onSubmit, initialData, onCancel }) => {
  const [description, setDescription] = useState('');
  const [consultationCount, setConsultationCount] = useState('');
  const [textoplano, setTextoplano] = useState('');

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description || '');
      setConsultationCount(initialData.consultationCount || '');
      setTextoplano(initialData.textoplano || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: initialData.id || null, description, consultationCount, textoplano });
    setDescription('');
    setConsultationCount('');
    setTextoplano('');
  };

  return (
    <form style={formContainerStyles} onSubmit={handleSubmit}>
      <div style={formRowStyles}>
        <label style={labelStyles}>Descrição:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyles}
        />
      </div>
      <div style={formRowStyles}>
        <label style={labelStyles}>Quantidade de Consultas/Mês:</label>
        <input
          type="number"
          value={consultationCount}
          onChange={(e) => setConsultationCount(e.target.value)}
          style={inputStyles}
        />
      </div>
      <div style={formRowStyles}>
        <label style={labelStyles}>Texto do Plano:</label>
        <textarea
          value={textoplano}
          onChange={(e) => setTextoplano(e.target.value)}
          style={textareaStyles}
        />
      </div>
      <div style={buttonContainerStyles}>
        <button type="submit" style={saveButtonStyles}>Salvar Plano</button>
        <button type="button" style={cancelButtonStyles} onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default PlanForm;
