'use client'
import React, { useState } from 'react';
import PlanForm from './planForm';
import PlanList from './listaPlanos';

interface Plan {
  id: number | null;
  description?: string;  // Exemplo de propriedade, ajuste conforme as propriedades reais do seu plano
  // Adicione outras propriedades relevantes para o plano aqui
}

const mainContainerStyles: React.CSSProperties = {
  margin: '20px auto',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const addButtonStyles: React.CSSProperties = {
  marginBottom: '20px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#a500f7',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
};

const MainPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const handleAddPlan = (plan: Plan) => {
    if (plan.id === null) {
      plan.id = plans.length + 1;  // Garante que o novo plano tenha um ID único
      setPlans([...plans, plan]);
    } else {
      setPlans(plans.map(p => (p.id === plan.id ? plan : p)));
    }
  };

  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
  };

  return (
    <div style={mainContainerStyles}>
      <button style={addButtonStyles} onClick={() => setEditingPlan({ id: null })}>
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
