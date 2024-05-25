import React, { useState, useEffect } from 'react';

const formStyles = {

  margin: '15px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '2px solid #a500f7',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  padding: '10px',
  
};

const inputRowStyles = {
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #ddd',
  padding: '10px',
};

const labelStyles = {
  marginRight: '10px',
};

const tableHeaderStyles = {
  color: '#a500f7',
  padding: '10px',
  textAlign: 'center',
  maxWidth: '100%',
  
};

const inputStyles = {
  width: 'calc(100% - 20px)',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px',
};

const buttonRowStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: '10px',
};

const buttonStyles = {
  marginLeft: '10px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#a500f7',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
};

const SpecialtyForm = ({ onSubmit, initialData, onCancel }) => {
  const [id, setId] = useState(null);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (initialData) {
      setId(initialData.id);
      setDescription(initialData.description);
      setDuration(initialData.duration);
    } else {
      setId(null);
      setDescription('');
      setDuration('');
    }
  }, [initialData]);

  const formatDuration = (value) => {
    let formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length > 2) {
      formattedValue = `${formattedValue.slice(0, 2)}:${formattedValue.slice(2)}`;
    }

    formattedValue = formattedValue.slice(0, 5);

    return formattedValue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, description, duration });
    setId(null);
    setDescription('');
    setDuration('');
    setShowAlert(true); 
    setTimeout(() => setShowAlert(false), 3000); 
  };

  return (
    <>
      {showAlert && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
          Informações salvas com sucesso!
        </div>
      )}
      
      <form style={formStyles} onSubmit={handleSubmit}>
      <h2 style={tableHeaderStyles}>Cadastrar Especialidades</h2>
        <div style={inputRowStyles}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <label style={labelStyles}>Descrição:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={inputStyles}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <label style={labelStyles}>Tempo de Consulta (Hora:Minuto):</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(formatDuration(e.target.value))}
              placeholder="hh:mm"
              maxLength="5"
              required
              style={inputStyles}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button type="submit" style={buttonStyles}>{initialData ? 'Salvar' : 'Adicionar'} Especialidade</button>
            {initialData && (
              <button
                type="button"
                onClick={onCancel}
                style={{ ...buttonStyles, backgroundColor: '#dc3545', marginLeft: '10px' }}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default SpecialtyForm;
