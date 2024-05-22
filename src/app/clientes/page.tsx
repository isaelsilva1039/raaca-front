'use client'

import { useMemo, useState } from 'react';
// @ts-ignore
import { useTable } from 'react-table';

import './style.css'
import { IconButton, Tooltip, Typography } from '@mui/material';
import CustomPagination from '@/core/infra/ports/react/componentes/paginacao/paginacao';
import CustomTable from '@/core/infra/ports/react/componentes/use-table/table';
import { Col, Row } from 'react-bootstrap';
import { formatDate } from 'date-fns';
import { FaTrash, FaUserEdit } from 'react-icons/fa';
import "../clientes/style.css";
import "../cadastro-profissionais/styles.css";


interface IData {
  id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
}

export default function Gerenciador() {

  const [expandedRows, setExpandedRows] = useState<any>({});
  const [modalEditar, setModalEditar] = useState({
    abriModal: false,
    profissional : {}
  });
  const [modalExcluir, setModalExcluir] = useState({
    abriModal: false,
    profissional : {}
  });




  // Colunas com tipagem explícita baseada na interface IData.

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Profissional",
        accessor: "nome",
        Cell: ({ row }: { row: { original: IData } }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={row.original?.avatarUrl}
              alt="Avatar"
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
            {row.original.nome}
          </div>
        ),
      },
      {
        Header: "Especialidade",
        accessor: "especialidade",
      },
    ],
    []
  );


    // Dados mockados
    const data = useMemo<IData[]>(
      () => [
        { id:1,  nome: "Produto A", especialidade: 'a', avatarUrl: "Produto A desc" },
        { id: 2, nome: "Produto B", especialidade: 's', avatarUrl: "Produto B desc" },
        { id: 3, nome: "Produto C", especialidade: 's', avatarUrl: "Produto C desc" },
      ],
      []
    );
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data });

    const toggleRowExpanded = (rowId: any) => {
      const newExpandedState = { ...expandedRows, [rowId]: !expandedRows[rowId] };
      setExpandedRows(newExpandedState);
    };


    const renderRowSubComponent = ({ row }: any) => (
      <Row className="rowContainer">
        <Row className="flexRow">
          <Col className="columnFlex">
            <img
              src={row.original.avatarUrl || "path/to/default/avatar.jpg"}
              alt={`Avatar de ${row.original.nome}`}
              className="avatarImage"
            />
  
            <Col className="columnStart">
              <text className="text-header">Nome</text>
              <small className="text-corpo" >{row?.original?.nome}</small>
            </Col>
          </Col>
  
          <Col className="columnStart">
            <text className="text-header">Especialidade</text>
            <small className="text-corpo" >{row?.original?.especialidade}</small>
          </Col>
  
          <Col className="columnStart">
            <text className="text-header">CPF</text>
            <small className="text-corpo" >{row?.original?.cpf}</small>
          </Col>
  
          <Col className="columnStart">
            <text className="text-header">Data de Nascimento</text>
            {/* <small className="text-corpo">{formatDate(row?.original?.data_nascimento)}</small> */}
          </Col>
  
          <Col className="columnStart">
            <text className="text-header">Email</text>
            {/* <small className="text-corpo" >{row.original.email}</small> */}
          </Col>
  
          <Col className="columnStart">
            {/* <text className="text-header">Ações</text> */}
            <Row className="botoes">
  
              <Tooltip title="Editar">
                <IconButton onClick={() =>{setModalEditar({abriModal: true, profissional:row?.original})}
                  }>
                  <FaUserEdit size={18} color="#707EAE" />
                </IconButton>
              </Tooltip>
  
              <Tooltip title="Deletar">
                <IconButton onClick={() =>{setModalExcluir({abriModal: true, profissional:row?.original})}} >
                  <FaTrash color="red" size={14} />
                </IconButton>
              </Tooltip>
            
            </Row>
          </Col>
        </Row>
      </Row>
    );
  

  return (
    <div className="container">
      <Typography
        sx={{
          color: "#707EAE",
          fontWeight: "500",
          lineHeight: "24px",
          fontSize: "15px",
        }}
      >
        Menu / Clientes
      </Typography>
    
      <div className="abela">
          {/* {loading ? (
            <MuiTableSkeleton />
          ) : ( */}
            <CustomTable
              columns={columns}
              data={data}
              expandedRows={expandedRows}
              toggleRowExpanded={toggleRowExpanded}
              renderRowSubComponent={renderRowSubComponent}
            />
          {/* )} */}
        </div>
        <div className="paginacao">
          {/* <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          /> */}
        </div>
    </div>
  );
}