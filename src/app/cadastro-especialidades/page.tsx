'use client'
import React, { useState } from 'react';
import SpecialtyForm from './especialidadeForm';
import SpecialtyList from './listaEspecialidades';

interface Specialty {
  id: number;
  description: string;
  duration: string;
}

const homeStyles: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
};

const Home: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const [editData, setEditData] = useState<Specialty | null>(null);

  const handleSubmit = (specialty: Specialty) => {
    const newSpecialty: Specialty = {
      id: nextId,
      description: specialty.description,
      duration: specialty.duration,
    };

    if (editData) {
      const updatedSpecialties = specialties.map(item =>
        item.id === specialty.id ? { ...specialty } : item
      );
      setSpecialties(updatedSpecialties);
      setEditData(null);
    } else {
      setSpecialties(prevSpecialties => [...prevSpecialties, newSpecialty]);
      setNextId(prevId => prevId + 1);
    }
  };

  const handleDelete = (id: number) => {
    setSpecialties(specialties.filter((specialty) => specialty.id !== id));
  };

  const handleEdit = (specialty: Specialty) => {
    setEditData(specialty);
  };

  const handleCancel = () => {
    setEditData(null);
  };

  return (
    <div style={homeStyles}>
      <SpecialtyForm onSubmit={handleSubmit} initialData={editData} onCancel={handleCancel} />
      <SpecialtyList specialties={specialties} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default Home;
