'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'; // Importação dinâmica para componentes que dependem do `document`
import Select from 'react-select';
import { FaTrash } from 'react-icons/fa';
import { Tooltip, IconButton } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

// Importação dinâmica do ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Specialty {
  specialty: string;
  consultationCount: string;
}

interface Plan {
  id: number | null;
  nome: string;
  description: string;
  fidelity: boolean;
  fidelityPeriod?: string;
  specialties: Specialty[];
  valor: string;
}

interface PlanFormProps {
  onSubmit: (data: Plan) => void;
  initialData: Plan;
  onCancel: () => void;
}

const specialtiesOptions = [
  { value: 'Cardiologia', label: 'Cardiologia' },
  { value: 'Dermatologia', label: 'Dermatologia' },
  // Add more specialties as needed
];

const fidelityOptions = [
  { value: 'sem-fidelidade', label: 'Sem Fidelidade' },
  { value: '6-meses', label: '6 meses' },
  { value: '12-meses', label: '12 meses' }
];

const formContainerStyles: React.CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
};

const formRowStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
};

const labelStyles: React.CSSProperties = {
  marginBottom: '5px',
  fontWeight: 'bold',
  color: '#333',
};

const inputStyles: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  width: '100%',
  boxSizing: 'border-box',
};

const selectStyles: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  width: '100%',
  boxSizing: 'border-box',
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
  backgroundColor: '#A500F700',
  color: '#a500f7',
};

const addButtonStyles: React.CSSProperties = {
  ...buttonStyles,
  backgroundColor: '#a500f7',
  color: '#fff',
  alignSelf: 'flex-start',
};

const PlanForm: React.FC<PlanFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [nome, setNome] = useState<string>(initialData.nome);
  const [description, setDescription] = useState<string>(initialData.description);
  const [fidelityPeriod, setFidelityPeriod] = useState<string>(initialData.fidelityPeriod || 'sem-fidelidade');
  const [specialties, setSpecialties] = useState<Specialty[]>(initialData.specialties || []);
  const [valor, setValor] = useState<string>(initialData.valor);

  useEffect(() => {
    setNome(initialData.nome);
    setDescription(initialData.description);
    setFidelityPeriod(initialData.fidelityPeriod || 'sem-fidelidade');
    setSpecialties(initialData.specialties || []);
    setValor(initialData.valor);
  }, [initialData]);

  const handleSpecialtyAdd = () => {
    setSpecialties([...specialties, { specialty: '', consultationCount: '' }]);
  };

  const handleSpecialtyChange = (index: number, field: string, value: string) => {
    const updatedSpecialties = specialties.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec
    );
    setSpecialties(updatedSpecialties);
  };

  const handleSpecialtyRemove = (index: number) => {
    setSpecialties(specialties.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ id: initialData.id, nome, description, fidelity: fidelityPeriod !== 'sem-fidelidade', fidelityPeriod, specialties, valor });
    setNome('');
    setDescription('');
    setFidelityPeriod('sem-fidelidade');
    setSpecialties([]);
    setValor('');
  };

  return (
    <form style={formContainerStyles} onSubmit={handleSubmit}>
      <div style={formRowStyles}>
        <label style={labelStyles}>Nome do Plano:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={inputStyles}
          required
        />
      </div>
      <div style={formRowStyles}>
        <label style={labelStyles}>Descrição do Plano:</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={{
            toolbar: [
              [{ 'font': [] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['link', 'image'],
              ['clean']
            ]
          }}
          formats={[
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'color',
            'background',
            'align',
            'link',
            'image'
          ]}
          style={{ height: '200px', marginBottom: '20px' }}
        />
      </div>
      <div style={formRowStyles}>
        <label style={labelStyles}>Fidelidade:</label>
        <select
          value={fidelityPeriod}
          onChange={(e) => setFidelityPeriod(e.target.value)}
          style={selectStyles}
          required
        >
          {fidelityOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div style={formRowStyles}>
        <label style={labelStyles}>Especialidades:</label>
        <button type="button" onClick={handleSpecialtyAdd} style={addButtonStyles}> + Especialidade</button>
      </div>
      {specialties.map((specialty, index) => (
        <div key={index} style={{ ...formRowStyles, flexDirection: 'row', alignItems: 'center' }}>
          <Select
            value={specialtiesOptions.find(option => option.value === specialty.specialty)}
            onChange={(selectedOption) => handleSpecialtyChange(index, 'specialty', selectedOption ? selectedOption.value : '')}
            options={specialtiesOptions}
            styles={{ container: (provided) => ({ ...provided, flex: 1, marginRight: '10px' }) }}
            required
          />
          <input
            type="number"
            placeholder="Quantidade de Consultas"
            value={specialty.consultationCount}
            onChange={(e) => handleSpecialtyChange(index, 'consultationCount', e.target.value)}
            style={{ ...inputStyles, flex: 1, marginRight: '10px' }}
            required
          />
          <Tooltip title="Remover">
            <IconButton onClick={() => handleSpecialtyRemove(index)}>
              <FaTrash color="red" size={14} />
            </IconButton>
          </Tooltip>
        </div>
      ))}
      <div style={formRowStyles}>
        <label style={labelStyles}>Valor:</label>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          style={inputStyles}
          required
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
