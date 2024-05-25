import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IconButton, Tooltip } from '@mui/material';
import { FaTrash, FaUserEdit } from 'react-icons/fa';

const tableStyles = {
  maxWidth: '100%',
  margin: '20px auto',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const tableHeaderStyles = {
  color: '#a500f7',
  padding: '10px',
  textAlign: 'center',
};

const tableRowStyles = {
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #ddd',
  padding: '10px',
};

const tableCellStyles = {
  flex: 1,
  padding: '10px',
  fontSize: '16px',
  textAlign: 'center',
};

const buttonStyles = {
  padding: '6px 12px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#a500f7',
  color: '#fff',
  fontSize: '14px',
  cursor: 'pointer',
};

const paginationStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
};

const iconButtonStyles = {
  ...buttonStyles,
  backgroundColor: 'transparent',
  color: '#a500f7',
  margin: '0 10px',
  padding: '5px',
};

const PlanList = ({ plans, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 5;

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      onDelete(id);
      alert('Plano excluído com sucesso!');
    }
  };

  const handleEdit = (plan) => {
    onEdit(plan);
  };

  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan);

  const totalPages = Math.max(Math.ceil(plans.length / plansPerPage), 1);

  return (
    <div style={tableStyles}>
      <h2 style={tableHeaderStyles}>Planos Cadastrados</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ ...tableRowStyles, background: '#f0f0f0', textTransform: 'uppercase', fontSize: '14px' }}>
            <th style={{ ...tableCellStyles, width: '10%' }}>ID</th>
            <th style={{ ...tableCellStyles, width: '20%' }}>Descrição</th>
            <th style={{ ...tableCellStyles, width: '15%' }}>Consultas/Mês</th>
            <th style={{ ...tableCellStyles, width: '35%' }}>Texto do Plano</th>
            <th style={{ ...tableCellStyles, width: '20%' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentPlans.map((plan) => (
            <tr key={plan.id} style={tableRowStyles}>
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
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} style={iconButtonStyles}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>{currentPage} de {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} style={iconButtonStyles}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default PlanList;
