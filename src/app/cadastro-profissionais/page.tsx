"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProfessionalFormModal from "@/core/infra/ports/react/modal-profissional/ProfessionalFormModal";

import { Button, Col, Row } from "react-bootstrap";
import { Pagination, Typography } from "@mui/material";
import { useExpanded, useTable } from "react-table";
import "../clientes/style.css";
import "./styles.css";
import { IoPersonAddOutline } from "react-icons/io5";
import { AnyCnameRecord } from "dns";
import CustomTable from "@/core/infra/ports/react/componentes/use-table/table";
import CustomPagination from "@/core/infra/ports/react/componentes/paginacao/paginacao";
import { fetchProfissionais } from "./ferch";
import MuiTableSkeleton from "@/core/infra/ports/react/componentes/skeleton/MuiTableSkeleton";

interface IData {
  id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
}

export default function Professional() {
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [profissionais, setProfissionais] = useState<IData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [error, setError] = useState(null);

  const [expandedRows, setExpandedRows] = useState<any>({});

  const [loading, setLoading] = useState(true);

  const [isNovoMembro,setIsNovoMembro] = useState(false)

  const toggleRowExpanded = (rowId: any) => {
    const newExpandedState = { ...expandedRows, [rowId]: !expandedRows[rowId] };
    setExpandedRows(newExpandedState);
  };



  const fetchProfissionaisAll = () => {
    setLoading(true);
    const onFetchSuccess = (data: any) => {
      setProfissionais(data.original.data);
      setTotalItems(data.original.total);
      setItemsPerPage(data.original.perPage);

      setLoading(false);
    };

    const onFetchError = (error: any) => {
      console.error("Erro ao buscar profissionais:", error);
      setError(error);
      setLoading(false);
    };

    fetchProfissionais(currentPage, onFetchSuccess, onFetchError);
  }



  useEffect(() => {
    fetchProfissionaisAll()
  }, [currentPage]);


  useEffect(() => {
    if(isNovoMembro){
      fetchProfissionaisAll()
      setIsNovoMembro(false)
    }
    
  }, [isNovoMembro]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
              src={row.original.avatarUrl}
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

  const onUpdate = () => {
    setIsNovoMembro(true);
  }
  
  const renderRowSubComponent = ({ row }: any) => (
    <Row style={{
        padding:'0 70px 0 60px',
        borderRadius: '4px',
        background:' #fafafa'

    } }>
  <Row style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
  <Col  style={{display:'flex' , gap:'10px' , alignItems:'center' , flexDirection:'row' , justifyContent:'center'}}>
    <img
      src={row.original.avatarUrl || "path/to/default/avatar.jpg"} // Caminho para um avatar padrão caso não exista
      alt={`Avatar de ${row.original.nome}`}
      style={{ width: 100, height: 100, borderRadius: '50%' }}
    />
    <text>{row.original.nome}</text>
  </Col>

  <Col  style={{display:'flex' , gap:'10px' , alignItems:'flex-start' , flexDirection:'column' , justifyContent:'flex-start'}}>
    <text>Especialidade:</text>
    <text>{row.original.especialidade}</text>
  </Col>

  <Col  style={{display:'flex' , gap:'10px' , alignItems:'flex-start' , flexDirection:'column' , justifyContent:'flex-start'}}>
    <text>CPF:</text>
    <text>{row.original.cpf}</text>
  </Col>

  <Col  style={{display:'flex' , gap:'10px' , alignItems:'flex-start' , flexDirection:'column' , justifyContent:'flex-start'}}>
    <text>Data de Nascimento:</text>
    <text>{row.original.dataNascimento}</text>
  </Col>

  <Col  style={{display:'flex' , gap:'10px' , alignItems:'flex-start' , flexDirection:'column' , justifyContent:'flex-start'}}>
    <text>Email:</text>
    <text>{row.original.email}</text>
  </Col>

  {/* Add more fields as needed */}
</Row>
</Row>


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
            onUpdate={onUpdate}
          />
        </div>

        <div className="tabela">
          {loading ? (
            <MuiTableSkeleton />
          ) : (
            <CustomTable
              columns={columns}
              data={profissionais}
              expandedRows={expandedRows}
              toggleRowExpanded={toggleRowExpanded}
              renderRowSubComponent={renderRowSubComponent}
            />
          )}
        </div>
        <div className="paginacao">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
