'use client'
import React, { useState } from 'react';
import PlanForm from './planForm';
import PlanList from './listaPlanos';
import Typography from '@mui/material/Typography';

interface Specialty {
  specialty: string;
  consultationCount: string;
}

interface Plan {
  id: number | null;
  nome: string;
  description: string;
  textoplano: string;
  fidelity: boolean;
  fidelityPeriod?: string;
  specialties: Specialty[];
  valor: string;
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
      plan.id = plans.length + 1;  
      setPlans([...plans, plan]);
    } else {
      setPlans(plans.map(p => (p.id === plan.id ? plan : p)));
    }
    setEditingPlan(null);
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
    <div>
      <div className="container">
        <Typography
          className="list-top"
          sx={{
            color: "#707EAE",
            fontWeight: "500",
            lineHeight: "24px",
            fontSize: "15px",
          }}
        >
          Menu / Planos
        </Typography>
      </div>
      <div style={mainContainerStyles}>
        <button style={addButtonStyles} onClick={() => setEditingPlan({
          id: null,
          nome: '',
          description: '',
          textoplano: '',
          fidelity: false,
          fidelityPeriod: '',
          specialties: [],
          valor: ''
        })}>
          Adicionar Plano
        </button>
        {editingPlan ? (
          <PlanForm
            onSubmit={handleAddPlan}
            initialData={editingPlan}
            onCancel={handleCancelEdit}
          />
        ) : (
          <PlanList
            plans={plans}
            onDelete={handleDeletePlan}
            onEdit={handleEditPlan}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
