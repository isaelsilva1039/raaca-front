'use client'

import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IconButton, Tooltip } from '@mui/material';
import { FaTrash, FaUserEdit } from 'react-icons/fa';

// interface Plan {
//   id: number;
//   description: string;
//   consultationCount: number;
//   textoplano: string;
// }

interface PlanListProps {
  plans: any;
  onDelete: (id: number) => void;
  onEdit: (plan: any) => void;
}

const tableStyles: React.CSSProperties = {
  maxWidth: '100%',
  margin: '20px auto',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const tableHeaderStyles: React.CSSProperties = {
  color: '#a500f7',
  padding: '10px',
  textAlign: 'center',
};

const tableRowStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #ddd',
  padding: '10px',
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
};

const tableCellStyles: React.CSSProperties = {
  flex: 1,
  padding: '10px',
  fontSize: '16px',
  textAlign: 'center',
};

const paginationStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
};

const iconButtonStyles: React.CSSProperties = {
  background: 'transparent',
  color: '#a500f7',
  margin: '0 10px',
  padding: '5px',
};

const PlanList: React.FC<PlanListProps> = ({ plans, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 5;

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      onDelete(id);
      alert('Plano excluído com sucesso!');
    }
  };

  const handleEdit = (plan: any) => {
    onEdit(plan);
  };

  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan);

  const totalPages = Math.ceil(plans.length / plansPerPage);

  return (
    <div style={tableStyles}>
      <h2 style={tableHeaderStyles}>Planos Cadastrados</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
        <thead>
          <tr style={{ ...tableRowStyles, background: '#f0f0f0', textTransform: 'uppercase', fontSize: '14px', color: '#686868', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
            <th style={{ ...tableCellStyles, width: '10%' }}>ID</th>
            <th style={{ ...tableCellStyles, width: '20%' }}>Descrição</th>
            <th style={{ ...tableCellStyles, width: '15%' }}>Consultas/Mês</th>
            <th style={{ ...tableCellStyles, width: '35%' }}>Texto do Plano</th>
            <th style={{ ...tableCellStyles, width: '20%' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentPlans.map((plan : any) => (
            <tr key={plan.id} style={{ ...tableRowStyles, borderBottom: '1px solid #ddd', padding: '12px 15px', textAlign: 'left', backgroundColor: 'white', height: '10px' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>
              <td style={{ ...tableCellStyles, width: '10%' }}>{plan.id}</td>
              <td style={{ ...tableCellStyles, width: '20%' }}>{plan.description}</td>
              <td style={{ ...tableCellStyles, width: '15%' }}>{plan.consultationCount}</td>
              <td style={{ ...tableCellStyles, width: '35%' }}>{plan.textoplano}</td>
              <td style={{ ...tableCellStyles, width: '20%', display: 'flex', justifyContent: 'center' }}>
                <Tooltip title="Editar">
                  <IconButton onClick={() => handleEdit(plan)}>
                    <FaUserEdit size={18} color="#707EAE" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Deletar">
                  <IconButton onClick={() => handleDelete(plan.id)}>
                    <FaTrash color="red" size={14} />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={paginationStyles}>
        <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} style={iconButtonStyles}>
          {/* <FontAwesomeIcon icon={faChevronLeft} /> */}
        </button>
        <span>{currentPage} de {totalPages}</span>
        <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} style={iconButtonStyles}>
          {/* <FontAwesomeIcon icon={faChevronRight} /> */}
        </button>
      </div>
    </div>
  );
};

export default PlanList;
