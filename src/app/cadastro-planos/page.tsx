'use client';
import React, { useState } from 'react';
import PlanForm from './planForm';
import PlanList from './listaPlanos';

const mainContainerStyles = {
  margin: '20px auto',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const addButtonStyles = {
  marginBottom: '20px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#a500f7',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
};

const MainPage = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleAddPlan = (plan) => {
    if (plan.id === null) {
      plan.id = plans.length + 1;
      setPlans([...plans, plan]);
    } else {
      setPlans(plans.map(p => (p.id === plan.id ? plan : p)));
    }
  };

  const handleDeletePlan = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
  };

  return (
    <div style={mainContainerStyles}>
      <button style={addButtonStyles} onClick={() => setEditingPlan({})}>
        Adicionar Plano
      </button>
      {editingPlan && (
        <PlanForm
          onSubmit={handleAddPlan}
          initialData={editingPlan}
          onCancel={handleCancelEdit}
        />
      )}
      <PlanList
        plans={plans}
        onDelete={handleDeletePlan}
        onEdit={handleEditPlan}
      />
    </div>
  );
};

export default MainPage;
