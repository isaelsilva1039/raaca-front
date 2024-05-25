import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

const SpecialtyList = ({ specialties, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const specialtiesPerPage = 5;

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta especialidade?')) {
      onDelete(id);
      alert('Especialidade excluída com sucesso!');
    }
  };

  const handleEdit = (specialty) => {
    onEdit(specialty);
  };

  const indexOfLastSpecialty = currentPage * specialtiesPerPage;
  const indexOfFirstSpecialty = indexOfLastSpecialty - specialtiesPerPage;
  const currentSpecialties = specialties.slice(indexOfFirstSpecialty, indexOfLastSpecialty);

  const totalPages = Math.max(Math.ceil(specialties.length / specialtiesPerPage), 1);

  return (
    <div style={tableStyles}>
      <h2 style={tableHeaderStyles}>Especialidades Cadastradas</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ ...tableRowStyles, background: '#f0f0f0', textTransform: 'uppercase', fontSize: '14px' }}>
            <th style={{ ...tableCellStyles, width: '10%' }}>ID</th>
            <th style={{ ...tableCellStyles, width: '40%' }}>Descrição</th>
            <th style={{ ...tableCellStyles, width: '30%' }}>Tempo</th>
            <th style={{ ...tableCellStyles, width: '20%' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentSpecialties.map((specialty) => (
            <tr key={specialty.id} style={tableRowStyles}>
              <td style={{ ...tableCellStyles, width: '10%' }}>{specialty.id}</td>
              <td style={{ ...tableCellStyles, width: '40%', textAlign: 'center', paddingLeft: '10px' }}>{specialty.description}</td>
              <td style={{ ...tableCellStyles, width: '30%', fontSize: '14px', color: '#666' }}>{specialty.duration}</td>
              <td style={{ ...tableCellStyles, width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={() => handleDelete(specialty.id)} style={{ ...buttonStyles, marginRight: '5px' }}>Excluir</button>
                <button onClick={() => handleEdit(specialty)} style={{ ...buttonStyles, backgroundColor: '#ffc107' }}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={paginationStyles}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          style={iconButtonStyles}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <span style={{ margin: '0 10px', fontSize: '16px', lineHeight: '32px' }}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          style={iconButtonStyles}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default SpecialtyList;
