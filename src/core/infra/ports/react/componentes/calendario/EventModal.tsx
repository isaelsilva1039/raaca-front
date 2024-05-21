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
import { postNovoAgendamento, updateAgendamento } from "@/app/api/horarios/posAgendamento";
import { fetchMes } from "@/app/api/horarios/horarios-api";
import { buscarHorariosDisponiveisMedico } from "@/app/api/horarios/getDisponilibilida";

interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
  user_id: number;
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

  console.log(status)


  const salvarAgendamento = () => {

        let startTime, endTime;

        if (diaSelecionado && horarioSelecionadoState) {
            startTime = `${format(diaSelecionado, "yyyy-MM-dd")}T${horarioSelecionadoState.start}`;
            endTime = `${format(diaSelecionado, "yyyy-MM-dd")}T${horarioSelecionadoState.end}`;
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
          handleClose();
        },
        (onError: any) => {
          setIsErro(true);
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

  console.log(selectedEvent)

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

  // Função para rolar as datas horizontalmente
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={remarcado ? 'xl' : 'md'}>
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
            <img
              key={1}
              src={selectedEvent?.extendedProps?.medico_avatar}
              alt={selectedEvent?.extendedProps?.medicoName}
              className={"avatar"}
              style={{ border: "1px solid" }}
            />
            <text>{selectedEvent?.extendedProps.medicoName}</text>
          </div>
        </DialogTitle>
        <DialogContent className="agenda-informacao">
          <text className="text">Informação sobre agenda</text>
          {!remarcado && (
            <DialogContentText className="detalhes">
              <div className="container-cliente">
                <img
                  key={1}
                  src={selectedEvent?.extendedProps?.cliente_avatar}
                  alt={selectedEvent?.extendedProps?.clientName}
                  className={"avatar"}
                />
                <text>{selectedEvent?.extendedProps.clientName}</text>
              </div>
              <div>
                <text className="text">De </text>
                {selectedEvent &&
                  format(new Date(selectedEvent.start), "dd/MM/yyyy HH:mm:ss")}
                <text className="text"> até </text>
                {selectedEvent &&
                  selectedEvent.end &&
                  format(
                    addMinutes(new Date(selectedEvent.end), 1),
                    "dd/MM/yyyy HH:mm:ss"
                  )}
              </div>
              <div>
                <text className="text">status :</text>
                <text>{selectedEvent?.extendedProps.details}</text>
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
                    label="Cancelado"
                  />
                  <FormControlLabel
                    value="remarcado"
                    control={<Radio />}
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
                medicos={medicos}
                medicoSelecionado={medicoSelecionado}
                setMedicoSelecionado={setMedicoSelecionado}
              />

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
                          "Agendas não liberadas"
                        )}
                      </>
                    )}
                  </Box>
                </FormControl>
              )}
            </FormControl>
          )}
        </DialogContent>
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
