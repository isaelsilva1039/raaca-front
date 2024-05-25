'use client';
import React, { useState } from 'react';
import SpecialtyForm from './especialidadeForm';
import SpecialtyList from './listaEspecialidades';

const Home = () => {
  const [specialties, setSpecialties] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [editData, setEditData] = useState(null);

  const handleSubmit = (specialty) => {
    const newSpecialty = {
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
     
      setSpecialties([...specialties, newSpecialty]);
      setNextId(nextId + 1);
    }
  };

  const handleDelete = (id) => {
    setSpecialties(specialties.filter((specialty) => specialty.id !== id));
  };

  const handleEdit = (specialty) => {
    setEditData(specialty); 
  };

  const handleCancel = () => {
    setEditData(null); 
  };

  return (
    <div>
      <SpecialtyForm onSubmit={handleSubmit} initialData={editData} onCancel={handleCancel} />
      <SpecialtyList specialties={specialties} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default Home;