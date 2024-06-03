"use client";
import React, { useEffect, useState } from "react";
import ProfessionalFormModal from "@/core/infra/ports/react/modal-profissional/ProfessionalFormModal";
import { Button, Col, Row } from "react-bootstrap";
import { FilledInput, IconButton, Tooltip, Typography } from "@mui/material";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { TfiSearch } from "react-icons/tfi";
import { fetchProfissionais } from "./ferch";
import MuiTableSkeleton from "@/core/infra/ports/react/componentes/skeleton/MuiTableSkeleton";
import CustomPagination from "@/core/infra/ports/react/componentes/paginacao/paginacao";
import ProfessionalFormModaleditar from "@/core/infra/ports/react/modal-profissional/ProfessionalFormModaleditar";
import ProfessionalFormModaleExcluir from "@/core/infra/ports/react/modal-profissional/ProfessionalFormModaleExcluir";
import moment from 'moment';
import { useCliente } from "@/core/helpes/UserContext";
import "./styles.css";

interface IData {
  id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
  cpf: string;
  dataNascimento: string;
  email: string;
}

export default function Professional() {
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [profissionais, setProfissionais] = useState<IData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [isNovoMembro, setIsNovoMembro] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { token } = useCliente();
  const [modalEditar, setModalEditar] = useState({ abriModal: false, profissional: {} });
  const [modalExcluir, setModalExcluir] = useState({ abriModal: false, profissional: {} });

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
      setLoading(false);
    };

    fetchProfissionais(searchTerm, currentPage, onFetchSuccess, onFetchError, token);
  };

  const handleClicBuscar = () => {
    fetchProfissionaisAll();
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

  function formatDate(dateString: any) {
    return moment(dateString).format("DD/MM/YYYY");
  }

  return (
    <div className="container">
      <Typography className="list-top" sx={{ color: "#707EAE", fontWeight: "500", lineHeight: "24px", fontSize: "15px" }}>
        Menu / Profissionais
      </Typography>
      <div className="sub-container-geral">
        <Row className="container-novo">
          <Col md={6}>
            <Button variant="primary" className="novo-profissional" onClick={() => setModalShow(true)}>
              <IoPersonAddOutline /> Adicionar
            </Button>
          </Col>
          <Col md={6} className="container-busca">
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
            <Button className="outline-secondary" onClick={handleClicBuscar}>
              <TfiSearch />
            </Button>
          </Col>
        </Row>

        <ProfessionalFormModal show={modalShow} handleClose={() => setModalShow(false)} onUpdate={() => setIsNovoMembro(true)} />
        <ProfessionalFormModaleditar show={modalEditar.abriModal} handleClose={() => setModalEditar({ abriModal: false, profissional: {} })} onUpdate={() => setIsNovoMembro(true)} profissional={modalEditar.profissional} />
        <ProfessionalFormModaleExcluir show={modalExcluir.abriModal} handleClose={() => setModalExcluir({ abriModal: false, profissional: {} })} onUpdate={() => setIsNovoMembro(true)} profissional={modalExcluir.profissional} />

        <div className="abela">
          {loading ? (
            <MuiTableSkeleton />
          ) : (
            profissionais.map((profissional) => (
              <div key={profissional.id} className="card-principal" onClick={() => setExpandedRow(expandedRow === profissional.id ? null : profissional.id)}>
                <div className="card-content">
                  <div>
                    <img src={profissional.avatarUrl || '/path_to_default_avatar.png'} alt={`Avatar de ${profissional.nome}`} className="avatarImage" />
                  </div>
                  <div><strong>ID:</strong> {profissional.id}</div>
                  <div><strong>Profissional:</strong> {profissional.nome}</div>
                  <div><strong>Especialidade:</strong> {profissional.especialidade}</div>
                  {expandedRow === profissional.id && (
                    <div className="card-expandido">
                      <div className="card-content">
                        <div><strong>Nome:</strong> {profissional.nome}</div>
                        <div><strong>Especialidade:</strong> {profissional.especialidade}</div>
                        <div><strong>CPF:</strong> {profissional.cpf}</div>
                        <div><strong>Data de Nascimento:</strong> {formatDate(profissional.dataNascimento)}</div>
                        <div><strong>Email:</strong> {profissional.email}</div>
                        <div className="botoes">
                          <Tooltip title="Editar">
                            <IconButton onClick={() => setModalEditar({ abriModal: true, profissional })}>
                              <FaUserEdit size={18} color="#707EAE" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Deletar">
                            <IconButton onClick={() => setModalExcluir({ abriModal: true, profissional })}>
                              <FaTrash color="red" size={14} />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="paginacao">
          <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}
