"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProfessionalFormModal from "@/core/infra/ports/react/modal-profissional/ProfessionalFormModal";

import { Button, Col, Row } from "react-bootstrap";
import { IconButton, Pagination, Tooltip, Typography } from "@mui/material";
import { useExpanded, useTable } from "react-table";
import "../clientes/style.css";
import "./styles.css";
import { IoPersonAddOutline } from "react-icons/io5";
import { AnyCnameRecord } from "dns";
import CustomTable from "@/core/infra/ports/react/componentes/use-table/table";
import CustomPagination from "@/core/infra/ports/react/componentes/paginacao/paginacao";
import { fetchProfissionais } from "./ferch";
import MuiTableSkeleton from "@/core/infra/ports/react/componentes/skeleton/MuiTableSkeleton";
import { FaTrash } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import ProfessionalFormModaleditar from "@/core/infra/ports/react/modal-profissional/ProfessionalFormModaleditar";

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

  const [isNovoMembro, setIsNovoMembro] = useState(false);

  const [modalEditar, setModalEditar] = useState({
    abriModal: false,
    profissional : {}
  });

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
  };

  useEffect(() => {
    fetchProfissionaisAll();
  }, [currentPage]);

  useEffect(() => {
    if (isNovoMembro) {
      fetchProfissionaisAll();
      setIsNovoMembro(false);
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
  };
  
  // const hendlerEditar = () => {

  
  //   return <div className="container-modal">
  //         <ProfessionalFormModaleditar
  //           show={modalEditar}
  //           handleClose={() => setModalEditar({abriModal: false, profissional:{}})}
  //           onUpdate={onUpdate}
  //           profissionail={modalEditar.profissional}
  //         />
  //        </div>
  // }

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
            <small>{row.original.nome}</small>
          </Col>
        </Col>

        <Col className="columnStart">
          <text className="text-header">Especialidade</text>
          <small>{row.original.especialidade}</small>
        </Col>

        <Col className="columnStart">
          <text className="text-header">CPF</text>
          <small>{row.original.cpf}</small>
        </Col>

        <Col className="columnStart">
          <text className="text-header">Data de Nascimento</text>
          <small>{row.original.data_nascimento}</small>
        </Col>

        <Col className="columnStart">
          <text className="text-header">Email</text>
          <small>{row.original.email}</small>
        </Col>

        <Col className="columnStart">
          <text className="text-header">Ações</text>
          <Row className="botoes">

            <Tooltip title="Editar">
              <IconButton onClick={() =>{setModalEditar({abriModal: true, profissional:row?.original})}
                }>
                <FaUserEdit size={18} color="#707EAE" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Deletar">
              <IconButton>
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
        

        <div className="container-modal">
          <ProfessionalFormModaleditar
            show={modalEditar.abriModal}
            handleClose={() => setModalEditar({abriModal: false, profissional:{}})}
            onUpdate={onUpdate}
            profissionail={modalEditar.profissional}
          />
    </div>
         {/* {hendlerEditar()} */}


       <div className="abela">
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
