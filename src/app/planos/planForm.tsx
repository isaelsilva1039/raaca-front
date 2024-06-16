import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Lista de especialidades médicas
const specialtiesOptions = [
  { value: 'Cardiologia', label: 'Cardiologia' },
  { value: 'Dermatologia', label: 'Dermatologia' },
  { value: 'Pediatria', label: 'Pediatria' },
  { value: 'Ginecologia', label: 'Ginecologia' },
  { value: 'Ortopedia', label: 'Ortopedia' },
  { value: 'Neurologia', label: 'Neurologia' },
  { value: 'Oftalmologia', label: 'Oftalmologia' },
  { value: 'Psiquiatria', label: 'Psiquiatria' },
  { value: 'Endocrinologia', label: 'Endocrinologia' },
  { value: 'Urologia', label: 'Urologia' },
];

interface PlanData {
  id?: number;
  nome: string;
  description: string;
  textoplano: string;
  fidelity: boolean;
  fidelityPeriod?: string;
  specialties: { specialty: string, consultationCount: string }[];
  valor: string;
}

interface PlanFormProps {
  onSubmit: (data: PlanData) => void;
  initialData: PlanData;
  onCancel: () => void;
}

const formContainerStyles: React.CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const formRowStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
};

const labelStyles: React.CSSProperties = {
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyles: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%',
};

const textareaStyles: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%',
  height: '100px',
};

const selectStyles: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%',
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

const addButtonStyles: React.CSSProperties = {
  ...buttonStyles,
  backgroundColor: '#28a745',
  color: '#fff',
  alignSelf: 'flex-start',
};

const fidelityRowStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const PlanForm: React.FC<PlanFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [nome, setNome] = useState<string>(initialData.nome);
  const [description, setDescription] = useState<string>(initialData.description);
  const [textoplano, setTextoplano] = useState<string>(initialData.textoplano);
  const [fidelity, setFidelity] = useState<boolean>(initialData.fidelity);
  const [fidelityPeriod, setFidelityPeriod] = useState<string | undefined>(initialData.fidelityPeriod);
  const [specialties, setSpecialties] = useState<{ specialty: string, consultationCount: string }[]>(initialData.specialties || []);
  const [valor, setValor] = useState<string>(initialData.valor);

  useEffect(() => {
    setNome(initialData.nome);
    setDescription(initialData.description);
    setTextoplano(initialData.textoplano);
    setFidelity(initialData.fidelity);
    setFidelityPeriod(initialData.fidelityPeriod);
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
    onSubmit({ id: initialData.id, nome, description, textoplano, fidelity, fidelityPeriod, specialties, valor });
    setNome('');
    setDescription('');
    setTextoplano('');
    setFidelity(false);
    setFidelityPeriod(undefined);
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
        />
      </div>
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
        <label style={labelStyles}>Texto do Plano:</label>
        <textarea
          value={textoplano}
          onChange={(e) => setTextoplano(e.target.value)}
          style={textareaStyles}
        />
      </div>
      <div style={formRowStyles}>
        <label style={labelStyles}>Fidelidade:</label>
        <div style={fidelityRowStyles}>
          <input
            type="checkbox"
            checked={fidelity}
            onChange={(e) => setFidelity(e.target.checked)}
          />
          {fidelity && (
            <select
              value={fidelityPeriod}
              onChange={(e) => setFidelityPeriod(e.target.value)}
              style={selectStyles}
            >
              <option value="">Selecione o período</option>
              <option value="6 meses">6 meses</option>
              <option value="12 meses">12 meses</option>
            </select>
          )}
        </div>
      </div>
      <div style={formRowStyles}>
        <label style={labelStyles}>Especialidades:</label>
        <button type="button" onClick={handleSpecialtyAdd} style={addButtonStyles}>Adicionar Especialidade</button>
      </div>
      {specialties.map((specialty, index) => (
        <div key={index} style={{ ...formRowStyles, flexDirection: 'row', alignItems: 'center' }}>
          <Select
            value={specialtiesOptions.find(option => option.value === specialty.specialty)}
            onChange={(selectedOption) => handleSpecialtyChange(index, 'specialty', selectedOption ? selectedOption.value : '')}
            options={specialtiesOptions}
            styles={{ container: (provided) => ({ ...provided, flex: 1, marginRight: '10px' }) }}
          />
          <input
            type="number"
            placeholder="Quantidade de Consultas"
            value={specialty.consultationCount}
            onChange={(e) => handleSpecialtyChange(index, 'consultationCount', e.target.value)}
            style={{ ...inputStyles, flex: 1, marginRight: '10px' }}
          />
          <button type="button" onClick={() => handleSpecialtyRemove(index)} style={{ ...buttonStyles, backgroundColor: '#dc3545', color: '#fff' }}>Remover</button>
        </div>
      ))}
      <div style={formRowStyles}>
        <label style={labelStyles}>Valor:</label>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          style={inputStyles}
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
