'use client';

import React, { useState, useMemo } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { FaTrash, FaUserEdit, FaEye } from 'react-icons/fa';
import CustomTable from '@/core/infra/ports/react/componentes/use-table/table';
import CustomPagination from '@/core/infra/ports/react/componentes/paginacao/paginacao';
import "../clientes/style.css";

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
  id_woocomerce: any;
}

interface PlanListProps {
  plans: Plan[];
  onDelete: (id: number) => void;
  onEdit: (plan: Plan) => void;
  setCurrentPage: any;
  currentPage: any;
  totalItems:any;
}

const PlanList: React.FC<PlanListProps> = ({ plans, onDelete, onEdit, currentPage , setCurrentPage,totalItems }) => {

  const [expandedRows, setExpandedRows] = useState<any>({});

  const handleDelete = (id: number | null) => {
    if (id !== null) {
      onDelete(id);
    }
  };


  const toggleRowExpanded = (rowId: any) => {
    const newExpandedState = { ...expandedRows, [rowId]: !expandedRows[rowId] };
    setExpandedRows(newExpandedState);
  };

  const renderRowSubComponent = ({ row }: any) => {
    const { descricao, especialidades } = row?.original;
  
    return (
      <div style={{ padding: '10px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Descrição</h3>
        <div dangerouslySetInnerHTML={{ __html: descricao }} />

        
        <h3>Especialidades</h3>
        <ul>
          {especialidades.map((especialidade: { nome: string; consultationCount: number }, index: number) => (
            <li key={index}>
              {especialidade.nome} - {especialidade.consultationCount} consultas
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

  const handleEdit = (plan: Plan) => {
    onEdit(plan);
  };

  // const indexOfLastPlan = currentPage * plansPerPage;
  // const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  // const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan);

  // const totalPages = Math.ceil(plans.length / plansPerPage);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Nome do Plano",
        accessor: "nome_plano",
      },
      {
        Header: "Fidelidade",
        accessor: "periodo_fidelidade",
      },
      {
        Header: "Valor",
        accessor: "valor",
      },

      {
        Header: "Numer plano no woocomerce",
        accessor: "id_woocomerce",
      },

      
      {
        Header: "Ações",
        accessor: "actions",
        Cell: ({ row }: { row: { original: Plan } }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip title="Editar">
              <IconButton onClick={() => handleEdit(row.original)}>
                <FaUserEdit size={18} color="#707EAE" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Deletar">
              <IconButton onClick={() => handleDelete(row.original.id)}>
                <FaTrash color="red" size={14} />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <Typography
        variant="h6"
        style={{
          color: "#707EAE",
          fontWeight: "500",
          lineHeight: "24px",
          fontSize: "15px",
          // textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Planos Cadastrados
      </Typography>

      <div>
        <CustomTable
          columns={columns}
          data={plans}
          expandedRows={expandedRows}
          toggleRowExpanded={toggleRowExpanded}
          renderRowSubComponent={renderRowSubComponent}
        />

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalItems}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanList;
