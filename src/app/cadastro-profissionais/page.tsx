"use client";
import React, { useMemo, useState } from "react";
import ProfessionalFormModal from "@/core/infra/ports/react/modal-profissional/ProfessionalFormModal";

import { Button } from "react-bootstrap";
import { Typography } from "@mui/material";
import { useExpanded, useTable } from "react-table";
import "../clientes/style.css";
import "./styles.css";
import { IoPersonAddOutline } from "react-icons/io5";
import { AnyCnameRecord } from "dns";
import CustomTable from "@/core/infra/ports/react/componentes/use-table/table";

interface IData {
  id: number;
  name: string;
  specialty: string;
  avatarUrl: string;
}

export default function Professional() {
  const [modalShow, setModalShow] = useState(false);
  const [expandedRows, setExpandedRows] = useState<any>({});


  const toggleRowExpanded = (rowId:any) => {
    const newExpandedState = { ...expandedRows, [rowId]: !expandedRows[rowId] };
    setExpandedRows(newExpandedState);
  };

  const renderRowSubComponent = ({ row }:any) => (
    <div>
      {/* Render additional details for the expanded row here */}
      More details for {row.original.name}
    </div>
  );


  const data = useMemo<IData[]>(
    () => [
      {
        id: 1,
        name: "Dr. Jane Doe",
        specialty: "Cardiologist",
        avatarUrl: "https://randomuser.me/api/portraits/women/81.jpg",
      },
      {
        id: 2,
        name: "Dr. John Smith",
        specialty: "Dermatologist",
        avatarUrl: "https://randomuser.me/api/portraits/men/82.jpg",
      },
      {
        id: 3,
        name: "Dr. Marcio",
        specialty: "Dermatologist",
        avatarUrl: "https://randomuser.me/api/portraits/men/83.jpg",
      },
      {
        id: 4,
        name: "Dr. Marcio",
        specialty: "Dermatologist",
        avatarUrl: "https://randomuser.me/api/portraits/men/84.jpg",
      },
      {
        id: 5,
        name: "Dr. Marcio",
        specialty: "Dermatologist",
        avatarUrl: "https://randomuser.me/api/portraits/men/85.jpg",
      },
      {
        id: 6,
        name: "Dr. Marcio",
        specialty: "Dermatologist",
        avatarUrl: "https://randomuser.me/api/portraits/men/86.jpg",
      },

      {
        id: 7,
        name: "Dr. Marcio",
        specialty: "Dermatologist",
        avatarUrl: "https://randomuser.me/api/portraits/men/87.jpg",
      },

      {
        id: 8,
        name: "Dr. Marcio",
        specialty: "Dermatologist",
        avatarUrl: "https://randomuser.me/api/portraits/men/88.jpg",
      },

      {
        id: 9,
        name: "Dr. Marcio",
        specialty: "Dermatologist",
        avatarUrl: "https://randomuser.me/api/portraits/men/89.jpg",
      },

      {
        id: 10,
        name: "Dr. Marcio",
        specialty: "Dermatologist",
        avatarUrl: "https://randomuser.me/api/portraits/men/90.jpg",
      },

      {
        id: 11,
        name: "Dr. Marcio",
        specialty: "Dermatologist",
        avatarUrl: "https://randomuser.me/api/portraits/men/91.jpg",
      },
    ],
    []
  );

  // Colunas com tipagem explícita baseada na interface IData.
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Profissional",
        accessor: "name",
        Cell: ({ row }: { row: { original: IData } }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={row.original.avatarUrl}
              alt="Avatar"
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
            {row.original.name}
          </div>
        ),
      },
      {
        Header: "Especialidade",
        accessor: "specialty",
      },
    ],
    []
  );


  return (
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
        Menu / Profissionais
      </Typography>

      <div className="sub-container-geral">
        <div className="container-novo">
          <Button
            variant="primary"
            className="novo-profissional"
            onClick={() => setModalShow(true)}
          >
            <IoPersonAddOutline /> Adicionar Novo Profissional
          </Button>
        </div>

        <div className="container-modal">
          <ProfessionalFormModal
            show={modalShow}
            handleClose={() => setModalShow(false)}
          />
        </div>

        <div className="tabela">
        <CustomTable 
            columns={columns} 
            data={data} 
            expandedRows={expandedRows}
            toggleRowExpanded={toggleRowExpanded}
            renderRowSubComponent={renderRowSubComponent}
    
          />
        </div>
      </div>
    </div>
  );
}
