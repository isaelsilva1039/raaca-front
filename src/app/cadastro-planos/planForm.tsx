'use client'
import React, { useState, useEffect } from 'react';

interface PlanData {
  id?: number;
  description: string;
  consultationCount: string;
  textoplano: string;
}

interface PlanFormProps {
  onSubmit: any;
  initialData: any;
  onCancel: () => void;
}

const formContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const formRowStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '20px',
};

const labelStyles: React.CSSProperties = {
  marginRight: '10px',
  fontWeight: 'bold',
};

const inputStyles: React.CSSProperties = {
  flex: '1',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const textareaStyles: React.CSSProperties = {
  flex: '1',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  height: '100px',
};

const buttonContainerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const buttonStyles: React.CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
};

const saveButtonStyles: React.CSSProperties = {
  ...buttonStyles,
  backgroundColor: '#a500f7',
  color: '#fff',
  marginRight: '10px',
};

const cancelButtonStyles: React.CSSProperties = {
  ...buttonStyles,
  backgroundColor: '#dc3545',
  color: '#fff',
};

const PlanForm: React.FC<PlanFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [description, setDescription] = useState<string>(initialData.description);
  const [consultationCount, setConsultationCount] = useState<string>(initialData.consultationCount);
  const [textoplano, setTextoplano] = useState<string>(initialData.textoplano);

  useEffect(() => {
    setDescription(initialData.description);
    setConsultationCount(initialData.consultationCount);
    setTextoplano(initialData.textoplano);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ id: initialData.id, description, consultationCount, textoplano });
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
