"use client";
import DoctorCard from "@/core/infra/ports/react/componentes/doctor/cards-doctor";
import { Doctor } from "@/core/infra/ports/react/componentes/doctor/types";
import { CircularProgress, Grid, Skeleton, Typography } from "@mui/material";
import "./styles.css";
import CalendarComponent from "@/core/infra/ports/react/componentes/calendario/CalendarComponent";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { fetchProfissionais } from "../cadastro-profissionais/ferch";
import { useCliente } from "@/core/helpes/UserContext";
import AgendamentosSkeleton from "@/core/infra/ports/react/componentes/skeleton/AgendamentosSkeleton";
import { fetchEventos, fetchEventosMedico } from "../api/horarios/eventos";
import { FaFilterCircleXmark } from "react-icons/fa6";

import { FiFilter as Filter } from "react-icons/fi";
import { getProfissnionais } from "../cadastro-profissionais/getProfissionais";
import { getEspecialidadeConsultas, getVerificarAgendasLiberadas } from "../api/horarios/getVerificarAgendasLiberadas";
import CondicionalDisplay from "@/core/infra/ports/react/componentes/CondicionalDisplay/CondicionalDisplay";

interface IData {
  id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
  user_id: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  tipo: string;
  created_at: string;
  updated_at: string;
  cpf: string | null;
  fk_anexo: string | null;
}

interface Cliente {
  id: number;
  name: string;
  email: string;
  phone: string;
  mobilePhone: string;
  cpfCnpj: string;
  plano: string;
  postalCode: string;
  address: string;
  addressNumber: string;
  complement: string;
  province: string;
  externalReference: string;
  notificationDisabled: number;
  observations: string;
  created_at: string;
  updated_at: string;
  id_cliente_assas: string;
  date_of_birth: string;
  total: string;
  user_id: number;
}

interface Consulta {
  id: number;
  quantidade_consultas: number;
  inicio_data: string;
  fim_data: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  quantidade_realizada: number;
}

interface UserData {
  user: User;
  clientes: Cliente[];
  consultas: Consulta[];
}

export default function Agendamentos() {
  const [profissionais, setProfissionais] = useState<any>([]);

  const [usuarioCliente, setUsuarioCliente] = useState<UserData>();

  const [eventos, setEventos] = useState<any>({});

  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [idSelect, setIdSelect] = useState<null | number>(null);
  const { token, user } = useCliente();
  const [loadingEventosMedico, setLoadingEventosMedico] =
    useState<boolean>(false);
  const [novoEventoState, setNovoEvento] = useState(false);

  const [quantidadeConsultasPendente, setQuantidadeConsultasPendente] = useState(0);
  const [quantideDeConsultasQuePodeRealizar, setQuantideDeConsultasQuePodeRealizar] = useState(0);
  
  
  // Estado para verificar as condições
  const [isAtingido, setIsAtingido] = useState(false);
  const [isPrazoPassado, setIsPrazoPassado] = useState(false);
  const [isLiberdo, serIsNotLiberado] = useState(true);

  const [planosProfissionalEspecialidade, setPlanosProfissionalEspecialidade] = useState({});


  const fetchProfissionaisAll = () => {
    if (!token) return;
    setLoading(true);
    const onFetchSuccess = (data: any) => {
      setProfissionais(data?.original?.profissionais);
      setTotalItems(data?.original?.total);
      setItemsPerPage(data?.original?.perPage);
      setLoading(false);
    };

    const onFetchError = (error: any) => {
      console.error("Erro ao buscar profissionais:", error);
      setError(error);
      setLoading(false);
    };

    getProfissnionais(onFetchSuccess, onFetchError, token);
  };

  const onUpdate = () => {
    setNovoEvento(true);
  };

  const fetchMyEventos = () => {
    if (!token) return;

    setLoading(true);
    const onFetchSuccess = (data: any) => {
      setEventos(data?.data);
      setQuantidadeConsultasPendente(data?.count)
      setLoading(false);
    };

    const onFetchError = (error: any) => {
      console.error("Erro ao buscar profissionais:", error);
      setError(error);
      setLoading(false);
    };

    fetchEventos(onFetchSuccess, onFetchError, token);
  };

  useEffect(() => {
    if (!token) return;
    if (user?.tipo == 3) {
      getMe();
      getPlanoEspecialidade()
    }

    fetchProfissionaisAll();
    fetchMyEventos();

  }, [token, novoEventoState]);


  const getMe = () => {
    if (!token) return;

    const onFetchSuccess = (data: any) => {

      setUsuarioCliente(data);
      validateConsultas(data?.consultas);
    };

    const onFetchError = (error: any) => {};
    getVerificarAgendasLiberadas(token, onFetchSuccess, onFetchError);
  };

  const fetchMyEventosFilter = () => {
    if (!token) return;

    setLoadingEventosMedico(true);

    const onFetchSuccess = (data: any) => {
      setEventos(data.data);
      setLoading(false);
      setLoadingEventosMedico(false);
    };

    const onFetchError = (error: any) => {
      console.error("Erro ao buscar profissionais:", error);
      setError(error);
      setLoading(false);
      setLoadingEventosMedico(false);
    };

    fetchEventosMedico(onFetchSuccess, onFetchError, token, idSelect);
  };


  const getPlanoEspecialidade = () => {
    if (!token) return;

    // setLoadingEventosMedico(true);

    const onFetchSuccess = (data: any) => {

      setPlanosProfissionalEspecialidade(data)

      // setEventos(data.data);
      // setLoading(false);
      // setLoadingEventosMedico(false);
    };

    const onFetchError = (error: any) => {
      console.error("Erro ao buscar profissionais:", error);
      setError(error);
      setLoading(false);
      setLoadingEventosMedico(false);
    };

    getEspecialidadeConsultas(token, onFetchSuccess, onFetchError);
  };
  

  useEffect(() => {
    if (!token) return;
    if (idSelect) {
      fetchMyEventosFilter();
    } else {
      setLoadingEventosMedico(true);
      const onFetchSuccess = (data: any) => {
        setLoadingEventosMedico(false);

        setEventos(data.data);
      };

      const onFetchError = (error: any) => {
        console.error("Erro ao buscar profissionais:", error);
        setError(error);
        setLoadingEventosMedico(false);
      };

      fetchEventos(onFetchSuccess, onFetchError, token);
      setNovoEvento(false);
    }
  }, [idSelect]);

  useEffect(() => {
    if (novoEventoState) {
      if (!token) return;

      const onFetchSuccess = (data: any) => {
        setEventos(data.data);
      };

      const onFetchError = (error: any) => {
        console.error("Erro ao buscar profissionais:", error);
        setError(error);
        setLoading(false);
      };

      fetchEventos(onFetchSuccess, onFetchError, token);
      setNovoEvento(false);
    }
  }, [novoEventoState]);

  const onMedicoSelec = (id_user: any) => {
    setIdSelect(id_user);
  };

  const validateConsultas = (consultas: Consulta[]) => {
  
    if (consultas.length < 1) {
      serIsNotLiberado(false);
      return;
    }

    const today = new Date();
    consultas.forEach((consulta) => {
      setQuantideDeConsultasQuePodeRealizar(consulta.quantidade_consultas)
      const fimData = new Date(consulta.fim_data);

      if (consulta.quantidade_realizada >= consulta.quantidade_consultas) {
        setIsAtingido(true);
      } else {
        setIsAtingido(false);
        
      }

      if (fimData < today) {
        setIsPrazoPassado(true);
      } else {
        setIsPrazoPassado(false);
      }
    });
  };

  const renderPageLimite = () => {
    return (
      <CondicionalDisplay
        isAtingido={isAtingido}
        isPrazoPassado={isPrazoPassado}
        isLiberdo={isLiberdo}
        podeAgendarConsultas={true}
      />
    );
  };

  return (
    <>
      {/* {usuarioCliente && usuarioCliente?.clientes > 0  } */}
      <div className="">
        {loading ? (
          <AgendamentosSkeleton />
        ) : (
          <>
            <Typography
              className="list-top"
              sx={{
                color: "#707EAE",
                fontWeight: "500",
                lineHeight: "24px",
                fontSize: "15px",
              }}
            >
              Menu / Agendamentos
            </Typography>
            {isAtingido || isPrazoPassado || !isLiberdo ? (
              <div>{renderPageLimite()}</div>
            ) : (
              <div className="container-page">
                {user?.tipo == 1 && (
                  <div className="menu-profissionais">
                    <div className="card-lista-prof">
                      <text className="text-item">Lista de profissionais</text>
                      {idSelect ? (
                        <FaFilterCircleXmark
                          color="#707EAE"
                          onClick={() => setIdSelect(null)}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    {profissionais?.map((doctor: any) => (
                      <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        onMedicoSelec={onMedicoSelec}
                        idSelect={idSelect}
                      />
                    ))}
                  </div>
                )}
                <div className="calendario">
                  {loadingEventosMedico ? (
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 500,
                      }}
                    >
                      <CircularProgress color="secondary" />
                      <Typography variant="h6" sx={{ mt: 2 }} color="secondary">
                        Carregando...
                      </Typography>
                    </Grid>
                  ) : (
                    <CalendarComponent
                      events={eventos}
                      onUpdate={onUpdate}
                      isAtingido={isAtingido}
                      isPrazoPassado={isPrazoPassado}
                      quantidadeConsultasPendente={quantidadeConsultasPendente}
                      quantideDeConsultasQuePodeRealizar={quantideDeConsultasQuePodeRealizar}
                      planosProfissionalEspecialidade={planosProfissionalEspecialidade}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
