"use client";

import React, { useEffect, useMemo, useState } from "react";
import CustomTable from "../cadastro-especialidades/customTable";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import "../cadastro-especialidades/style.css";
import { Col, Row } from "react-bootstrap";
import { IoPersonAddOutline } from "react-icons/io5";
import "./styles.css";
import { BiSolidMegaphone } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import dynamic from "next/dynamic";
import { FaCheckCircle } from "react-icons/fa";
import { useCliente } from "@/core/helpes/UserContext";
import { obtemChamados, postChamados } from "../api/chamados.tsx/service";
import InteracoesChamado from "@/core/infra/ports/react/componentes/InteracoesChamado/InteracoesChamado";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Importa o tema do Quill
import CustomPagination from "@/core/infra/ports/react/componentes/paginacao/paginacao";
import MuiTableSkeleton from "@/core/infra/ports/react/componentes/skeleton/MuiTableSkeleton";
import AvatarPlaceholder from "@/core/infra/ports/react/componentes/AvatarPlaceholder/AvatarPlaceholder";

const ChamadosPage: React.FC = () => {
  const { token, user } = useCliente();
  const [chamados, setChamados] = useState<any>([]);
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [showModal, setModalShow] = useState(false);
  const [page, setStatePage] = useState<number>(1);
  const [per_page, setStateper_page] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<any>();
  const [loading , setLoading] = useState<boolean>(false)


  const [formData, setFormData] = useState({
    chave: "",
    titulo: "",
    situacao: '1',
    interacao_assunto: "",
  });

  useEffect(() => {
    fetchChamados();
  }, [per_page, page, token]);

  const fetchChamados = async () => {
    if (!token) return;
    setLoading(true)
    obtemChamados(
      per_page,
      page,
      token,
      (data) => {
        setChamados(data.data);
        setCurrentPage(data.meta);
        setLoading(false)
      },
      (error) => {
        console.error('Erro ao obter chamados:', error);
        setLoading(false)
      }
    );
  };

  const statusMap: any = {
    1: 'aberto',
    2: 'pendente cliente',
    3: 'finalizado',
  };

  const getStatusName = (statusNumber: any) => {
    return statusMap[statusNumber] || 'Status desconhecido';
  };

  const getStatusColor = (statusNumber: any) => {
    switch (statusNumber) {
      case '1': // Aberto
        return '#7dd67d';
      case '2': // Pendente cliente
        return 'orange';
      case '3': // Finalizado
        return 'gray';
      default:
        return '#707EAE';
    }
  };

  const handlePostChamadosSuccess = (data: any) => {
    setModalShow(false);

    setFormData({
      chave: "",
      titulo: "",
      situacao: '1',
      interacao_assunto: "",
    });
    fetchChamados(); 
  };


  
  const handlePostChamadosError = (error: any) => {
    console.error("Erro ao criar chamado:", error);
    setLoading(false)
  };

  const handleSubmit = () => {
    const chave = '';
    setLoading(true)
    postChamados(
      formData.titulo,
      formData.interacao_assunto,
      formData.situacao,
      token,
      handlePostChamadosSuccess,
      handlePostChamadosError,
      chave,
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Código",
        accessor: "id",
      },
      {
        Header: "Título",
        accessor: "titulo",
      },
      {
        Header: "Criado por",
        accessor: "criado_por",
        Cell: ({ row }: { row: { original: any } }) => {
     
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
             <AvatarPlaceholder
                avatarUrl={row?.original?.criado_por?.avatar}
                name={row?.original?.criado_por?.name || "Desconhecido"}
              />
              {row?.original?.criado_por?.name}
            </div>
          );
        }
      },
      {
        Header: "Situação",
        accessor: "situacao",
        Cell: ({ row }: { row: { original: any } }) => (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
            color: 'white',
            borderRadius: '4px',
            padding: '4px',
            width: 'fit-content',
            minWidth: '12rem',
            fontSize: '12px',
            background: getStatusColor(row?.original?.situacao)
          }}>
            {getStatusName(row?.original?.situacao)}
          </div>
        ),
      },
    ],
    [expandedRows]
  );

  const toggleRowExpanded = (rowId: any) => {
    const newExpandedState = { ...expandedRows, [rowId]: !expandedRows[rowId] };
    setExpandedRows(newExpandedState);
  };

  const handleAddInteracao = (chave: string, assunto: string, status: string) => {
    setLoading(true)
    postChamados(
      formData?.titulo,
      assunto,
      status,
      token,
      handlePostChamadosSuccess,
      handlePostChamadosError,
      chave,
    );
  };

  const renderRowSubComponent = ({ row }: { row: { original: any } }) => {
    return (
      <InteracoesChamado
        chamado={row.original}
        onAddInteracao={handleAddInteracao}
      />
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      interacao_assunto: value,
    }));
  };


  return (
    <div>
      <Typography
        className="list-top"
        sx={{
          color: "#707EAE",
          fontWeight: "500",
          lineHeight: "24px",
          fontSize: "15px",
        }}
      >
        Menu / Chamados
      </Typography>

      <div className="container-chamado">
        <Row className="container-novo">
          <Col md={6}>
            <a className="novo_chamado" onClick={() => setModalShow(true)}>
              <BiSolidMegaphone /> Novo chamado
            </a>
          </Col>
        </Row>

        {loading ? ( // Se estiver carregando, mostrar o indicador de carregamento
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
              <MuiTableSkeleton />
          </div>
        ) : chamados && chamados.length > 0 ? (
          <>
            <CustomTable
              columns={columns}
              data={chamados}
              expandedRows={expandedRows}
              toggleRowExpanded={toggleRowExpanded}
              renderRowSubComponent={renderRowSubComponent}
            />
            <div className="paginacao">
              <CustomPagination
                currentPage={page}
                totalPages={currentPage?.lastPage}
                onPageChange={setStatePage}
              />
            </div>
          </>
        ) : (
          <Typography variant="subtitle2">
            Você não possui chamados abertos
          </Typography>
        )}

        <Dialog open={showModal} onClose={() => setModalShow(false)} maxWidth={"lg"}>
          <DialogTitle
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <BiSolidMegaphone color='#707EAE' /> Novo Chamado
            </div>
            <MdClose
              onClick={() => setModalShow(false)}
              style={{ cursor: "pointer" }}
              size={20}
              color='#707EAE'
            />
          </DialogTitle>

          <DialogContent style={{ minHeight: '300px', height: 'fit-content' }}>
            <TextField
              name="titulo"
              label="Título"
              value={formData.titulo}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <ReactQuill
              value={formData.interacao_assunto}
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  [{ font: [] }],
                  [{ size: ["small", false, "large", "huge"] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
              formats={[
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "color",
                "background",
                "align",
                "link",
                "image",
              ]}
              style={{ height: "fit-content" }}
            />
          </DialogContent>

          <DialogActions>
            <Button style={{ color: 'black' }} onClick={() => setModalShow(false)}>
              Cancelar
            </Button>
            <Button className="btn-salvar" onClick={handleSubmit}>
              Salvar <FaCheckCircle />{" "}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ChamadosPage;
