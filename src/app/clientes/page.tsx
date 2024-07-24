"use client";

import { useEffect, useMemo, useState } from "react";
// @ts-ignore
import { useTable } from "react-table";

import "./style.css";
import { useMediaQuery } from "react-responsive";
import {
  Autocomplete,
  Button,
  DialogContent,
  FilledInput,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomPagination from "@/core/infra/ports/react/componentes/paginacao/paginacao";
import CustomTable from "@/core/infra/ports/react/componentes/use-table/table";
import { Col, Row } from "react-bootstrap";
import { formatDate } from "date-fns";
import "../clientes/style.css";
import "../cadastro-profissionais/styles.css";
import {
  getClientes,
  liberarConsultas,
  postClientesUser,
} from "../api/clientes/getClientes";
import { useCliente } from "@/core/helpes/UserContext";
import MuiTableSkeleton from "@/core/infra/ports/react/componentes/skeleton/MuiTableSkeleton";
import moment from "moment";
import { FaUserDoctor } from "react-icons/fa6";
import ModalConsulta from "@/core/infra/ports/react/componentes/modal-consultas/ModalConsulta";
import { IoCheckmarkCircleSharp, IoPersonAddOutline } from "react-icons/io5";
import { FaUserSlash } from "react-icons/fa6";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Importa o CSS para o estilo padrão
import MobileCard from "@/core/infra/ports/react/componentes/use-table/cardMobile";
import ModalEditarCliente from "@/core/infra/ports/react/componentes/modal-consultas/ModalEditarCliente";
import { FaUserEdit } from "react-icons/fa";
import { listarPlanos } from "../api/planos/planosService";
import { TfiSearch } from "react-icons/tfi";
import ModalNovoCliente from "@/core/infra/ports/react/componentes/modal-novo-cliente/ModalNovoCliente";

interface IData {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  stituacao: string;
  assas_assinatura: any;
  plano: any;
  qtd_consultas: any;
  user: any;
  plano_cliente: any;
}

export default function Gerenciador() {
  const { token, user } = useCliente();
  const [expandedRows, setExpandedRows] = useState<any>({});
  const [modalEditar, setModalEditar] = useState({
    abriModal: false,
    cliente: {},
  });
  const [modalEditarCliente, setModalEditarCliente] = useState({
    abriModal: false,
    cliente: {},
  });
  const [criarUser, setcriarUser] = useState({
    abriModal: false,
    cliente: {},
  });
  const [modalExcluir, setModalExcluir] = useState({
    abriModal: false,
    profissional: {},
  });
  const [page, setStatePage] = useState<number>(1);
  const [per_page, setStateper_page] = useState<number>(8);
  const [clientes, setCliente] = useState<IData[]>([]);
  const [currentPage, setCurrentPage] = useState<any>();
  const [plans, setPlans] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(true);
  const [loadingVinculo, setLoadingVinculo] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [loadingEdit, setLoadingEdit] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [planoSelecionado, setPlanoSelecionado] = useState<any>(null);
  const [modalShow, setModalShow] = useState(false);


  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getClientesAll();
    fetchPlans();
  }, [per_page, page, token]);



  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getClientesAll();
  }, [planoSelecionado]);

  

  const fetchPlans = async () => {
    try {
      setLoadingEdit(true);

      const data = await listarPlanos(10000, 1);

      setPlans(data?.data);
      setLoadingEdit(false);
    } catch (error: any) {
      setError(error.message);
      setLoadingEdit(false);
    } finally {
      setLoadingEdit(false);
    }
  };

  const handlePlanoChange = (event: any, newValue: any) => {
    setPlanoSelecionado(newValue);
  };

  const handleClicBuscar = () => {
    setLoading(true);
    getClientesAll();
  };

  const getClientesAll = () => {
    getClientes(
      per_page,
      page,
      token,
      (data) => {
        setCliente(data.data);
        setCurrentPage(data.meta);
        setLoading(false);
        setLoadingVinculo(false);
      },
      (error) => {
        setLoading(false);
        setLoadingVinculo(false);
      },
      searchTerm,
      planoSelecionado?.id
    );
  };

  const handleVincularClienteAserRacca = (idCliene: any) => {
    if (!criarUser.cliente) return;
    setLoadingVinculo(true);
    postClientesUser(
      idCliene,
      token,
      (data) => {
        getClientesAll();
      },
      (error) => {
        setLoading(false);
        setLoadingVinculo(false);
      }
    );
  };


  const columns = useMemo(
    () => [
      {
        Header: "Matricula",
        accessor: "id",
      },
      {
        Header: "nome",
        accessor: "name",
        Cell: ({ row }: { row: { original: IData } }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                row.original?.avatarUrl
                  ? row.original.avatarUrl
                  : "/img/avatar1.png"
              }
              alt="Avatar"
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
              }}
            />
            {row.original.name}
          </div>
        ),
      },
      {
        Header: "email",
        accessor: "email",
      },

      {
        Header: "plano",
        accessor: "plano",
        Cell: ({ row }: { row: { original: IData } }) => (
          <div>{row?.original?.plano_cliente?.nome_plano}</div>
        ),
      },

      {
        Header: "Prazo para consultas",
        accessor: "user.consultas", // Acessar consultas através do objeto user vinculado
        Cell: ({ row }) => {
          const consultas = row.original?.user?.consultas; // Acessando consultas do usuário vinculado

          const isExpired =
            new Date(
              consultas && consultas.length > 0 && consultas[0]?.fim_data
            ) < new Date();

          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              {consultas && consultas.length > 0 ? (
                <div
                  style={{
                    backgroundColor: isExpired
                      ? "rgb(207, 115, 115)"
                      : "#d4edda", // Vermelho se expirado, verde claro caso contrári
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {`De ${formatDate(consultas[0].inicio_data)} a ${formatDate(
                    consultas[0].fim_data
                  )}`}
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: "#f0f0f0", // Cinza claro para 'Sem consultas'
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  Sem consultas programadas
                </div>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  const toggleRowExpanded = (rowId: any) => {
    const newExpandedState = { ...expandedRows, [rowId]: !expandedRows[rowId] };
    setExpandedRows(newExpandedState);
  };

  function formatDate(dateString: any) {
    return moment(dateString).format("DD/MM/YYYY");
  }

  const onUpdate = () => {
    getClientesAll();
  };



  
  const renderRowSubComponent = ({ row }: any) => {
    const rowData = row.original || row;

    return (
      <>
        <Row className="rowContainer">
          <Row className="flexRow">
            <Col className="columnFlex">
              <img
                src={rowData.avatarUrl ? rowData.avatarUrl : "/img/avatar1.png"}
                alt={`Avatar de ${rowData.nome}`}
                className="avatarImage"
              />

              <Col className="columnStart">
                <text className="text-header">Nome</text>
                <small className="text-corpo">{rowData.name}</small>
              </Col>
            </Col>

            <Col className="columnStart">
              <text className="text-header">CPF</text>
              <small className="text-corpo">{rowData.cpfCnpj}</small>
            </Col>

            <Col className="columnStart">
              <text className="text-header">Data de Nascimento</text>
              <small className="text-corpo">
                {formatDate(rowData.date_of_birth)}
              </small>
            </Col>

            <Col className="columnStart">
              <Row className="botoes">
                {loadingVinculo ? (
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  <>
                    <Tooltip title="Mudar Plano">
                      <IconButton
                        onClick={() => {
                          setModalEditarCliente({
                            abriModal: true,
                            cliente: rowData,
                          });
                        }}
                      >
                        <FaUserEdit size={20} color="#cf7373" />
                      </IconButton>
                    </Tooltip>

                    {rowData.user_id ? (
                      <>
                        <Tooltip title="Liberar consultas">
                          <IconButton
                            onClick={() => {
                              setModalEditar({
                                abriModal: true,
                                cliente: rowData,
                              });
                            }}
                          >
                            <FaUserDoctor size={18} color="#707EAE" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Cliente já tem um usuario">
                          <IconButton>
                            <IoCheckmarkCircleSharp size={18} color="green" />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <Tooltip title="cliente não tem um usuario no racca">
                        <IconButton
                          onClick={() => {
                            handleVincularClienteAserRacca(rowData.id);
                          }}
                        >
                          <FaUserSlash size={18} color="red" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </Row>
      </>
    );
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });


  return (
    <>
    <div className="container-clientes">
      <Typography
        sx={{
          color: "#707EAE",
          fontWeight: "500",
          lineHeight: "24px",
          fontSize: "15px",
          padding: "12px",
        }}
      >
        Menu / Clientes
      </Typography>

      <div className="tabela">
        {loading ? (
          <MuiTableSkeleton />
        ) : (
          <>
          <div className="container-caixa-novo">
            <div>
              <Button
            className="novo-profissional"
            onClick={() => setModalShow(true)}
          >
            <IoPersonAddOutline /> Adicionar
          </Button>
            </div>
            <div className="container-buscar-clientes">
              <Autocomplete
                value={planoSelecionado}
                onChange={handlePlanoChange}
                options={plans}
                className="filtrar-por-plano"
                getOptionLabel={(option) => option.nome_plano}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filtrar por um plano"
                    variant="outlined"
                    fullWidth
                    className="inpunt-busca"
                  />
                )}
              />
              <FilledInput
                className="input-busca-cliente"
                inputMode="search"
                margin="dense"
                placeholder="Buscar..."
                type="text"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                color="secondary"
              />

              <Button
                className="outline-secondary"
                onClick={() => handleClicBuscar()}
              >
                <TfiSearch />
              </Button>
            </div>
            </div>
            {!isMobile ? (
              <CustomTable
                columns={columns}
                data={clientes}
                expandedRows={expandedRows}
                toggleRowExpanded={toggleRowExpanded}
                renderRowSubComponent={renderRowSubComponent}
              />
            ) : (
              <MobileCard
                columns={columns}
                data={clientes}
                expandedRows={expandedRows}
                toggleRowExpanded={toggleRowExpanded}
                renderRowSubComponent={renderRowSubComponent}
              />
            )}

            <div className="paginacao">
              <CustomPagination
                currentPage={page}
                totalPages={currentPage?.lastPage}
                onPageChange={setStatePage}
              />
            </div>
          </>
        )}
      </div>
      <ModalConsulta
        show={modalEditar.abriModal}
        handleClose={() => setModalEditar({ abriModal: false, cliente: {} })}
        cliente={modalEditar.cliente}
        onUpdate={onUpdate}
        onClose={{}}
        token={token}
      />

      <ModalEditarCliente
        show={modalEditarCliente.abriModal}
        handleClose={() =>
          setModalEditarCliente({ abriModal: false, cliente: {} })
        }
        cliente={modalEditarCliente.cliente}
        onUpdate={onUpdate}
        onClose={{}}
        token={token}
        planos={plans}
        loadingEdit={loadingEdit}
      />
    </div>


    <ModalNovoCliente
      show={modalShow}
      handleClose={() => setModalShow(false)}
      plans={plans}
      onUpdate={onUpdate}
      token={token}
      setLoading={setLoading}
      loading={loading}
    />
</>
  );
}
