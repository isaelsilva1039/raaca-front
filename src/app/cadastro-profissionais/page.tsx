"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProfessionalFormModal from "@/core/infra/ports/react/modal-profissional/ProfessionalFormModal";

import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { FilledInput, IconButton, Input, Pagination, TextField, Tooltip, Typography } from "@mui/material";
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
import ProfessionalFormModaleExcluir from "@/core/infra/ports/react/modal-profissional/ProfessionalFormModaleExcluir";
import moment from 'moment';
import { TfiSearch } from "react-icons/tfi";
import { useCliente } from "@/core/helpes/UserContext";
import { getEspecialidades, obetemTodasEspecialidades } from "../api/especialidade/especialidades";

interface IData {
  id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
}


interface ProfissionalData {
  id: number;
  nome: string;
  cpf: string;
  data_nascimento: string;
  especialidade: string;
  email: string;
  fileInput: File | null;
  fk_especialidade: number | null;
  link_sala: string;
  avatarUrl:any;
}



export default function Professional() {
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [profissionais, setProfissionais] = useState<IData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [error, setError] = useState(null);
  const [especialidades , setEspecialidades] = useState<any>();
  const [expandedRows, setExpandedRows] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [loading, setLoading] = useState(true);
  const [isNovoMembro, setIsNovoMembro] = useState(false);
  const [modalEditar, setModalEditar] = useState <any>({
    abriModal: false,
    profissional : {}
  });

  const { token } = useCliente();

  const [modalExcluir, setModalExcluir] = useState({
    abriModal: false,
    profissional : {}
  });

  const toggleRowExpanded = (rowId: any) => {
    const newExpandedState = { ...expandedRows, [rowId]: !expandedRows[rowId] };
    setExpandedRows(newExpandedState);
  };

  const fetchProfissionaisAll = () => {

    if(!token) return;
    
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


    
    fetchProfissionais(searchTerm ,currentPage, onFetchSuccess, onFetchError, token);
  };


  const getEspecialidadesAll = () => {

    if(!token) return;

    const onFetchSuccess = (data: any) => {
        console.log(data?.data)
        setEspecialidades(data.data)
    };

    const onFetchError = (error: any) => {
    
    };

    
    obetemTodasEspecialidades(token, onFetchSuccess, onFetchError);
  };

 
  const handleClicBuscar = () => {
    fetchProfissionaisAll();
  }

  useEffect(() => {
    fetchProfissionaisAll();
    getEspecialidadesAll()
  }, [currentPage, token]);

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
  

  const onClose = () => {
    setModalExcluir({abriModal: false , profissional: {}});
  }


  function formatDate(dateString: any) {
    return moment (dateString).format("DD/MM/YYYY");
  }

  const renderRowSubComponent = ({ row }: any) => (
    <Row className="rowContainer">
      <Row className="flexRow">
        <Col className="columnFlex">
          <img
          src={
            row.original?.avatarUrl
              ? row.original.avatarUrl
              : "/img/avatar1.png"
          }
            alt={`Avatar de ${row.original.nome}`}
            className="avatarImage"
          />

          <Col className="columnStart">
            <text className="text-header">Nome</text>
            <small className="text-corpo" >{row.original.nome}</small>
          </Col>
        </Col>

        <Col className="columnStart">
          <text className="text-header">Especialidade</text>
          <small className="text-corpo" >{row.original.especialidade}</small>
        </Col>

        <Col className="columnStart">
          <text className="text-header">CPF</text>
          <small className="text-corpo" >{row.original.cpf}</small>
        </Col>

        <Col className="columnStart">
          <text className="text-header">Data de Nascimento</text>
          <small className="text-corpo">{formatDate(row.original.data_nascimento)}</small>
        </Col>

        <Col className="columnStart">
          <text className="text-header">Email</text>
          <small className="text-corpo" >{row.original.email}</small>
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
        <Row className="container-novo">
          <Col md={6}>
          <Button
            variant="primary"
            className="novo-profissional"
            onClick={() => setModalShow(true)}
          >
            <IoPersonAddOutline /> Adicionar
          </Button>
          </Col>
         
          <Col md={6} className="container-busca" >
          
          <FilledInput
                className="input-busca"
                inputMode='search'
                margin="dense"
                placeholder="Buscar..."
                type="text"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            
                    <Button className="outline-secondary" onClick={ () => handleClicBuscar() } >
                        <TfiSearch /> 
                    </Button>
  
            </Col>
        </Row>

        <div>
          <ProfessionalFormModal
            show={modalShow}
            handleClose={() => setModalShow(false)}
            onUpdate={onUpdate}
            especialidades={especialidades}
          />
        </div>
        

        <div >
          <ProfessionalFormModaleditar
            show={modalEditar.abriModal}
            handleClose={() => setModalEditar({abriModal: false, profissional:{}})}
            onUpdate={onUpdate}
            profissionail={modalEditar?.profissional}
            especialidades={especialidades}
          />
       </div>



       <div>
          <ProfessionalFormModaleExcluir
            show={modalExcluir.abriModal}
            handleClose={() => setModalExcluir({abriModal: false, profissional:{}})}
            onUpdate={onUpdate}
            profissionail={modalExcluir.profissional}
            onClose={onClose}
          />
       </div>
       
       


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
