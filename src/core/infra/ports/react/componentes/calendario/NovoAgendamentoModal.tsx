import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  CircularProgress,
  IconButton,
  Alert,
  Box,
  Grid,
} from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import "./NovoAgendamentoModal.css";
import CloseIcon from "@mui/icons-material/Close";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import MedicosHorizontalList from "./MedicosHorizontalList";
import ScrollableDates from "./ScrollableDates";
import { buscarHorariosDisponiveisMedico } from "@/app/api/horarios/getDisponilibilida";
import { postNovoAgendamento } from "@/app/api/horarios/posAgendamento";
import { fetchMes } from "@/app/api/horarios/horarios-api";
import MesTabs from "./MesTabs";
import HorarioList from "./HorarioList";
import { useCliente } from "@/core/helpes/UserContext";
import { CircularProgressbar } from "react-circular-progressbar";
import CondicionalDisplay from "../CondicionalDisplay/CondicionalDisplay";

interface Medico {
  user_id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
  fk_especialidade: any;
}


interface Horario {
  start: string;
  end: string;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  medicos: Medico[];
  onUpdate: () => void;
  loading: boolean;
  podeAgendarConsultas: boolean;
  planosProfissionalEspecialidade: any;
}

export interface Especialidade {
  id: number;
  nome: string;
}

export interface Periodo {
  inicio_data: string;
  fim_data: string;
  consultas_no_periodo: number;
}

export interface Profissional {
  nome: string;
  email: string;
  cpf: string;
  data_nascimento: string;
  especialidade: Especialidade;
  avatar: string;
  fk_anexo: number;
  user_id: number;
  updated_at: string;
  fk_especialidade: number;
  link_sala: string;
  created_at: string;
  deleted_at: string | null;
}

export interface Meta {
  consultas_permitidas: string;
  consultas_realizadas: number;
  consultas_restantes: number;
  profissional: Profissional;
  periodos: Periodo[];
}

export interface ClienteData {
  cliente: string;
  meta: Meta[];
}

const NovoAgendamentoModal: React.FC<Props> = ({
  open,
  handleClose,
  medicos,
  onUpdate,
  loading,
  podeAgendarConsultas,
  planosProfissionalEspecialidade,
}) => {
  const { token, user } = useCliente();
  const [medicoSelecionado, setMedicoSelecionado] = useState<number | string>(
    ""
  );

  const [especialidadeProfissional, setEspecialidadeProfissional] = useState<any>(
    null
  );

  const [mesSelecionado, setMesSelecionado] = useState<number>(
    new Date().getMonth()
  );
  const [diasMes, setDiasMes] = useState<Date[]>([]);
  const [diaSelecionado, setDiaSelecionado] = useState<Date | null>(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<Horario[]>([]);
  const [monthe, setMonthe] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [loadMes, setLoadMes] = useState<boolean>(false);
  const [isErro, setIsErro] = useState<boolean>(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState<null>(null);
  const [horarioSelecionadoState, setHorarioSelecionadoState] = useState<any>({
    start: "",
    end: "",
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const buscarHorariosDisponiveis = (medicoId: number, dia: string) => {
    setLoad(true);
    buscarHorariosDisponiveisMedico(
      medicoId,
      dia,
      (data: any) => {
        setHorariosDisponiveis(data.data || []);
        setLoad(false);
      },
      (error: any) => {
        setHorariosDisponiveis([]);
        setLoad(false);
      },
      token
    );
  };

  const getMesAgenda = async () => {
    setLoadMes(true);
    const ativo = true;
    try {
      await fetchMes(
        token,
        medicoSelecionado,
        (data) => {
          setMonthe(data.original.data);
          setLoadMes(false);
        },
        (error) => {
          setLoadMes(false);
        },
        ativo
      );
    } catch (error) {
      setLoadMes(false);
    }
  };

  const limparCampos = () => {
    setDiaSelecionado(null);
    setDiasMes([]);
    setHorarioSelecionado(null);
    setHorariosDisponiveis([]);
    setHorarioSelecionadoState({});
    setMedicoSelecionado("");
  };

  const salvarAgendamento = () => {
    setLoad(true);
    if (horarioSelecionadoState && diaSelecionado) {
      const startTime = `${format(diaSelecionado, "yyyy-MM-dd")}T${
        horarioSelecionadoState?.start
      }`;
      const endTime = `${format(diaSelecionado, "yyyy-MM-dd")}T${
        horarioSelecionadoState?.end
      }`;
      postNovoAgendamento(
        medicoSelecionado,
        startTime,
        endTime,
        especialidadeProfissional,
        token,
        (data: any) => {
          setLoad(false);
          onUpdate();
          limparCampos();
          handleClose();
        },
        (error: any) => {
          setIsErro(true);
          setLoad(false);
          console.error("Erro ao criar agendamento:", error);
        }
      );
    } else {
      console.error("Selecione um horário válido para salvar.");
    }
  };

  const handleDiaClick = (dia: Date) => {
    setDiaSelecionado(dia);
    if (medicoSelecionado) {
      const diaFormatado = format(dia, "yyyy-MM-dd");
      buscarHorariosDisponiveis(Number(medicoSelecionado), diaFormatado);
    }
  };

  const handleMesChange = (mes: number) => {
    setMesSelecionado(mes);
    const inicioMes = startOfMonth(new Date(new Date().getFullYear(), mes, 1));
    const fimMes = endOfMonth(new Date(new Date().getFullYear(), mes, 1));
    const dias = eachDayOfInterval({ start: inicioMes, end: fimMes });
    setDiasMes(dias);
    setDiaSelecionado(null);
    setHorariosDisponiveis([]);
  };

  useEffect(() => {
    if (medicoSelecionado) {
      const mesAtual = new Date().getMonth();
      setMesSelecionado(mesAtual);
      const inicioMes = startOfMonth(
        new Date(new Date().getFullYear(), mesAtual, 1)
      );
      const fimMes = endOfMonth(
        new Date(new Date().getFullYear(), mesAtual, 1)
      );
      const dias = eachDayOfInterval({ start: inicioMes, end: fimMes });
      setDiasMes(dias);
      setDiaSelecionado(null);
      setHorariosDisponiveis([]);
    }
    getMesAgenda();
  }, [medicoSelecionado]);

  const handleHorarioClick = (horario: any) => {
    setHorarioSelecionado(horario);
    setHorarioSelecionadoState({ start: horario.start, end: horario.end });
  };

  const filtrarProfissionaisComConsultasDisponiveis = (data: ClienteData) => {
    if (!data?.meta) {
      return [];
    }

    return data?.meta
      .filter((item) => item?.consultas_restantes > 0)
      .map((item) => item?.profissional);
  };

  const renderPageLimite = () => {
    return (
      <CondicionalDisplay
        isAtingido={false}
        isPrazoPassado={false}
        isLiberdo={true}
        podeAgendarConsultas={true}
      />
    );
  };

  const profissionaisListaPermitas = filtrarProfissionaisComConsultasDisponiveis(
    planosProfissionalEspecialidade[0]
  );

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"xl"}>
      <DialogTitle className="agenda-title">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: "absolute", right: "8px", top: "8px" }}
        >
          <CloseIcon />
        </IconButton>
        <div style={{ padding: 0 }}>Novo agendamento</div>
        </DialogTitle>

      {loading ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <>
          <DialogContent className="container-modal">
            <FormControl fullWidth>
              <h2 className="title">Selecione um Profissional</h2>
              <MedicosHorizontalList
                medicos={medicos}
                medicoSelecionado={medicoSelecionado}
                setMedicoSelecionado={setMedicoSelecionado}
                profissional={profissionaisListaPermitas}
                setEspecialidadeProfissional={setEspecialidadeProfissional}
              />
            </FormControl>

            {medicoSelecionado && (
              <FormControl fullWidth style={{ display: "flex", gap: "10px" }}>
                <Box mt={2} mb={2}>
                  {loadMes ? (
                    <Grid
                      item
                      xs={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <CircularProgress color="secondary" />
                    </Grid>
                  ) : (
                    <>
                      {monthe.length > 0 ? (
                        <>
                          <MesTabs
                            monthe={monthe}
                            mesSelecionado={mesSelecionado}
                            handleMesChange={handleMesChange}
                          />
                          <ScrollableDates
                            diasMes={diasMes}
                            diaSelecionado={diaSelecionado}
                            handleDiaClick={handleDiaClick}
                          />
                          <HorarioList
                            horariosDisponiveis={horariosDisponiveis}
                            horarioSelecionado={horarioSelecionado}
                            handleHorarioClick={handleHorarioClick}
                            load={load}
                          />
                        </>
                      ) : (
                        <Grid
                          item
                          xs={12}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          Agendas não liberadas
                        </Grid>
                      )}
                    </>
                  )}
                </Box>
              </FormControl>
            )}

            {isErro && (
              <div style={{ padding: "12px 0px 12px 0px" }}>
                <Alert
                  onClose={() => setIsErro(false)}
                  onClick={() => setIsErro(false)}
                  color="error"
                >
                  Tente novamente
                </Alert>
              </div>
            )}
          </DialogContent>

          <DialogActions>
            <Button color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={salvarAgendamento}
              disabled={!horarioSelecionado}
            >
              Salvar <FaCheckCircle />
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default NovoAgendamentoModal;
