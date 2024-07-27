import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  DialogContentText,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  format,
  addMinutes,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
} from "date-fns";
import MedicosHorizontalList from "./MedicosHorizontalList";
import { useCliente } from "@/core/helpes/UserContext";
import MesTabs from "./MesTabs";
import ScrollableDates from "./ScrollableDates";
import HorarioList from "./HorarioList";
import {
  postNovoAgendamento,
  updateAgendamento,
} from "@/app/api/horarios/posAgendamento";
import { fetchMes } from "@/app/api/horarios/horarios-api";
import { buscarHorariosDisponiveisMedico } from "@/app/api/horarios/getDisponilibilida";
import LoadingSpinner from "../load/load";
import { FcVideoCall } from "react-icons/fc";
import { BsCalendarDateFill } from "react-icons/bs";
import { FcAlarmClock } from "react-icons/fc";
import { ClienteData } from "./NovoAgendamentoModal";
import AvatarImage from "../avatar/avatar";  // Importando o componente AvatarImage

interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
  user_id: number;
  link_sala: any;
}

interface Horario {
  start: string;
  end: string;
}

const EventModal = ({
  open,
  handleClose,
  selectedEvent,
  canShowOptionsForTypeThree,
  canShowAllOptions,
  handleSave,
  medicos,
  onUpdate,
  planosProfissionalEspecialidade
}: any) => {
  const [remarcado, setRemarcado] = useState(false);

  const { token, user } = useCliente();
  const [medicoSelecionado, setMedicoSelecionado] = useState<number | string>(
    ""
  );
  const [mesSelecionado, setMesSelecionado] = useState<number>(
    new Date().getMonth()
  );
  const [diasMes, setDiasMes] = useState<Date[]>([]);
  const [diaSelecionado, setDiaSelecionado] = useState<Date | null>(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<Horario[]>([]);
  const [monthe, setMonthe] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadMes, setLoadMes] = useState<boolean>(false);
  const [isErro, setIsErro] = useState<boolean>(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState<null>(null);
  const [horarioSelecionadoState, setHorarioSelecionadoState] = useState<any>({
    start: "",
    end: "",
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<any>("realizado");

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

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
    setDiaSelecionado(null), setDiasMes([]);
    setHorarioSelecionado(null);
    setHorariosDisponiveis([]);
    setHorarioSelecionadoState({});
    setMedicoSelecionado("");
  };

  const salvarAgendamento = () => {
    setLoading(true);
    let startTime, endTime;

    if (diaSelecionado && horarioSelecionadoState) {
      startTime = `${format(diaSelecionado, "yyyy-MM-dd")}T${
        horarioSelecionadoState.start
      }`;
      endTime = `${format(diaSelecionado, "yyyy-MM-dd")}T${
        horarioSelecionadoState.end
      }`;
    }

    updateAgendamento(
      selectedEvent?.extendedProps?.id_evento,
      medicoSelecionado,
      startTime,
      endTime,
      token,
      status,
      (data: any) => {
        onUpdate();
        limparCampos();
        setLoading(false);
        handleClose();
      },
      (onError: any) => {
        setIsErro(true);
        setLoading(false);
        console.error("Erro ao criar agendamento:", onError);
      }
    );
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

  const [especialidadeProfissional, setEspecialidadeProfissional] = useState<any>(null);

  const filtrarProfissionaisComConsultasDisponiveis = (data: ClienteData) => {
    if (!data?.meta) {
      return [];
    }

    return data.meta
      .filter((item) => item?.consultas_restantes > 0 && item?.profissional != null)
      .map((item) => item.profissional);
  };

  const profissionaisListaPermitas = filtrarProfissionaisComConsultasDisponiveis(planosProfissionalEspecialidade[0])

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

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={remarcado ? "md" : "lg"}
      >
        <DialogTitle className="agenda-titele">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: "8px", top: "8px" }}
          >
            <CloseIcon />
          </IconButton>
          <div
            className="container-cliente"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <AvatarImage src={selectedEvent?.extendedProps?.medico_avatar} />
            <text>{selectedEvent?.extendedProps.medicoName}</text>
          </div>
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
          <DialogContent className="agenda-informacao">
            <text className="text">Informação sobre agenda</text>
            {!remarcado && (
              <DialogContentText className="detalhes">
                <div className="container-cliente">
                  <AvatarImage src={selectedEvent?.extendedProps?.cliente_avatar} />
                  <text>{selectedEvent?.extendedProps.clientName}</text>
                </div>
              <div style={{background:'#ebe7ed', borderRadius:'4px', padding:'10px', display:'flex', flexDirection: 'column', gap:10}}>
              <div className="container-icones">
                  <text className="text">
                    {" "}
                    <BsCalendarDateFill size={18} color="#707EAE" /> De{" "}
                  </text>

                  {selectedEvent &&
                    format(
                      new Date(selectedEvent.start),
                      "dd/MM/yyyy HH:mm:ss"
                    )}

                  <text className="text"> até </text>

                  {selectedEvent &&
                    selectedEvent.end &&
                    format(
                      addMinutes(new Date(selectedEvent.end), 1),
                      "dd/MM/yyyy HH:mm:ss"
                    )}
                </div>

                <div className="container-icones">
                  <text className="text">
                    {" "}
                    <FcAlarmClock size={22} /> status :
                  </text>
                  <text>{selectedEvent?.extendedProps.details}</text>
                </div>

                <div className="container-icones">
                  <text className="text">
                    <FcVideoCall size={22} /> Link da sala
                  </text>
                  <a href={selectedEvent?.extendedProps?.link_sala}>
                    {" "}
                    : {"clique para entrar na sala"}
                  </a>
                </div>
              </div>
            
              </DialogContentText>
            )}

            <DialogContentText>
              {canShowOptionsForTypeThree ? (
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Atualizar status agendamento
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="status"
                    name="row-radio-buttons-group"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <FormControlLabel
                      value="cancelado"
                      control={<Radio />}
                      onClick={() => setRemarcado(false)}
                      label="Cancelado"
                    />
                    <FormControlLabel
                      value="remarcado"
                      control={<Radio />}
                      onClick={() => setRemarcado(true)}
                      label="Remarcado"
                    />
                  </RadioGroup>
                </FormControl>
              ) : (
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Atualizar status agendamento
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="status"
                    name="row-radio-buttons-group"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <FormControlLabel
                      value="realizado"
                      control={<Radio />}
                      label="Realizado"
                      onClick={() => setRemarcado(false)}
                    />
                    <FormControlLabel
                      value="cancelado"
                      control={<Radio />}
                      onClick={() => setRemarcado(false)}
                      label="Cancelado"
                    />
                    <FormControlLabel
                      value="remarcado"
                      control={<Radio />}
                      onClick={() => setRemarcado(true)}
                      label="Remarcado"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            </DialogContentText>

            {remarcado && (
              <FormControl fullWidth>
                <h2>Selecione um Profissional</h2>
                <MedicosHorizontalList
                  medicoSelecionado={medicoSelecionado}
                  setMedicoSelecionado={setMedicoSelecionado}
                  setEspecialidadeProfissional={setEspecialidadeProfissional}
                  profissional={profissionaisListaPermitas}
                />

                {medicoSelecionado && (
                  <FormControl
                    fullWidth
                    style={{ display: "flex", gap: "10px" }}
                  >
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
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              Agendas não liberadas
                            </Grid>
                          )}
                        </>
                      )}
                    </Box>
                  </FormControl>
                )}
              </FormControl>
            )}
          </DialogContent>
        )}
        <DialogActions>
          <Button className="btn-fechar" onClick={handleClose}>
            fechar
          </Button>
          <Button className="btn-salvar" onClick={salvarAgendamento}>
            Salvar <FaCheckCircle />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventModal;
