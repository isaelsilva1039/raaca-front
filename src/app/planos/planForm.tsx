'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaTrash } from 'react-icons/fa';
import { Tooltip, IconButton } from '@mui/material';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import dynamic from 'next/dynamic'; // Importação dinâmica para componentes que dependem do `document`

// Importando dinamicamente o ReactQuill para ser carregado apenas no lado do cliente
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Importa o tema do Quill

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

interface Especialidade {
  id: any;
  nome: any;
}

interface PlanFormProps {
  onSubmit: (data: Plan) => void;
  initialData: any;
  onCancel: () => void;
  especialidades: Especialidade[];
}

const fidelityOptions = [
  { value: 'sem-fidelidade', label: 'Sem Fidelidade' },
  { value: '6-meses', label: '6 meses' },
  { value: '12-meses', label: '12 meses' }
];

const formContainerStyles: React.CSSProperties = {
  margin: '0 auto',
  padding: '20px 200px 20px 200px',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const formRowStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const labelStyles: React.CSSProperties = {
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
  justifyContent: 'flex-end',
  gap: '10px',
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
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'center'
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
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'center'
};

const PlanForm: React.FC<PlanFormProps> = ({ onSubmit, initialData, onCancel, especialidades }) => {
  const [nome, setNome] = useState<any>(initialData.nome_plano);
  const [description, setDescription] = useState<any>(initialData?.descricao);
  const [fidelityPeriod, setFidelityPeriod] = useState<string>(initialData.periodo_fidelidade || 'sem-fidelidade');
  const [specialties, setSpecialties] = useState<Specialty[]>(initialData.especialidades || []);
  const [valor, setValor] = useState<string>(initialData.valor);


  console.log

  useEffect(() => {
    setNome(initialData.nome_plano);
    setDescription(initialData.descricao);
    setFidelityPeriod(initialData.periodo_fidelidade || 'sem-fidelidade');
    setSpecialties(initialData.especialidades || []);
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
  };

  const specialtiesOptions = especialidades && especialidades.map((especialidade: Especialidade) => ({
    value: especialidade.id,
    label: especialidade.nome
  }));

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
      <div style={{ ...formRowStyles, marginBottom: '32px' }}>
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
          style={{ height: '130px' }}
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
        <button type="button" onClick={handleSpecialtyAdd} style={addButtonStyles}><MdAdd /> Especialidade</button>
      </div>
      {specialties.map((specialty, index) => (
        <div key={index} style={{ ...formRowStyles, flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
         <Select
            value={specialtiesOptions.find(option => option.value === specialty.specialty)}
            onChange={(selectedOption) => handleSpecialtyChange(index, 'specialty', selectedOption ? selectedOption.value : '')}
            options={specialtiesOptions}
            styles={{ container: (provided) => ({ ...provided, flex: 1 }) }}
            defaultInputValue={initialData?.especialidades && initialData?.especialidades[index] ? initialData.especialidades[index].nome : undefined}
            // required
          />
          <input
            type="number"
            placeholder="Quantidade de Consultas"
            value={specialty.consultationCount}
            onChange={(e) => handleSpecialtyChange(index, 'consultationCount', e.target.value)}
            style={{ ...inputStyles, flex: 1 }}
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
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          style={inputStyles}
          required
        />
      </div>
      <div style={buttonContainerStyles}>
        <button type="button" style={cancelButtonStyles} onClick={onCancel}>Cancelar</button>
        <button type="submit" style={saveButtonStyles}>Salvar Plano <IoCheckmarkCircleSharp /> </button>
      </div>
    </form>
  );
};

export default PlanForm;
