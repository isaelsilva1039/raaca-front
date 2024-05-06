import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Tabs,
  Tab,
  Grid,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Alert,
} from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import "./styles.css";
import CloseIcon from "@mui/icons-material/Close";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { useCliente } from "@/core/helpes/UserContext";
import { FcInfo } from "react-icons/fc";
import { TbPointFilled } from "react-icons/tb";
import MedicosHorizontalList from "./MedicosHorizontalList";
import ScrollableDates from "./ScrollableDates";
import { buscarHorariosDisponiveisMedico } from "@/app/api/horarios/getDisponilibilida";
import { postNovoAgendamento } from "@/app/api/horarios/posAgendamento";
import { fetchMes } from "@/app/api/horarios/horarios-api";

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

interface Props {
  open: boolean;
  handleClose: () => void;
  medicos: Medico[];
  onUpdate: () => void;
}

const meses = [
  { nome: "Janeiro", valor: 0 },
  { nome: "Fevereiro", valor: 1 },
  { nome: "Março", valor: 2 },
  { nome: "Abril", valor: 3 },
  { nome: "Maio", valor: 4 },
  { nome: "Junho", valor: 5 },
  { nome: "Julho", valor: 6 },
  { nome: "Agosto", valor: 7 },
  { nome: "Setembro", valor: 8 },
  { nome: "Outubro", valor: 9 },
  { nome: "Novembro", valor: 10 },
  { nome: "Dezembro", valor: 11 },
];

const NovoAgendamentoModal: React.FC<Props> = ({
  open,
  handleClose,
  medicos,
  onUpdate,
}) => {
  const [medicoSelecionado, setMedicoSelecionado] = useState<number | string>(
    ""
  );
  const [mesSelecionado, setMesSelecionado] = useState<number>(
    new Date().getMonth()
  );
  const [diasMes, setDiasMes] = useState<Date[]>([]);
  const [diaSelecionado, setDiaSelecionado] = useState<Date | null>(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<Horario[]>([]);
  const { token } = useCliente();
  const [load, setLoad] = useState<boolean>(false);
  const [isErro, setIsErro] = useState<boolean>(false);
  const [monthe, setMonthe] = useState<any>([]);

  const handleMesChange = (mes: number) => {
    setMesSelecionado(mes);
    const inicioMes = startOfMonth(new Date(new Date().getFullYear(), mes, 1));
    const fimMes = endOfMonth(new Date(new Date().getFullYear(), mes, 1));
    const dias = eachDayOfInterval({ start: inicioMes, end: fimMes });
    setDiasMes(dias);
    setDiaSelecionado(null);
    setHorariosDisponiveis([]);
  };

  // Estado que mantém o índice do horário selecionado
  const [horarioSelecionado, setHorarioSelecionado] = useState<null>(null);

  // Estado que mantém o índice do horário selecionado
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
    const ativo = true;
    if (!token) return;
    if (!medicoSelecionado) return;
    try {
      await fetchMes(
        token,
        medicoSelecionado,
        (data) => {
          // console.log(data.data)
          setMonthe(data.original.data);
        },
        (error) => {},
        ativo
      );
    } catch (error) {}
  };

  const limparCampos = () => {
    setDiaSelecionado(null), setDiasMes([]);
    setHorarioSelecionado(null);
    setHorariosDisponiveis([]);
    setHorarioSelecionadoState({});
    setMedicoSelecionado("");
  };

  const salvarAgendamento = () => {
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
        token,
        (data: any) => {
          // Ação de sucesso, ex: exibir uma mensagem ou atualizar a UI
          console.log("Agendamento criado com sucesso:", data);
          onUpdate();
          limparCampos();
          handleClose();
        },
        (error: any) => {
          setIsErro(true);
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

  // Atualiza automaticamente o mês atual ao selecionar um profissional
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

  // Função para selecionar um horário
  const handleHorarioClick = (horario: any) => {
    setHorarioSelecionado(horario);

    setHorarioSelecionadoState({ start: horario.start, end: horario.end });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle className="agenda-titele">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: "absolute", right: "8px", top: "8px" }}
        >
          <CloseIcon />
        </IconButton>
        <div style={{ padding: "0px 0px 20px 0" }}>
          <text>Novo agendamento</text>
        </div>
      </DialogTitle>
      <DialogContent className="container-modal">
        <FormControl fullWidth>
          <h2>Selecione um Profissional</h2>
          <MedicosHorizontalList
            medicos={medicos}
            medicoSelecionado={medicoSelecionado}
            setMedicoSelecionado={setMedicoSelecionado}
          />
        </FormControl>
        {/* Verificar se um profissional foi selecionado */}
        {medicoSelecionado && (
          <FormControl fullWidth style={{ display: "flex", gap: "10px" }}>
            <Box mt={2} mb={2}>
              {/* Tabs para seleção de meses */}

              {monthe.length > 0 ? (
                <>
                  <Tabs
                    value={mesSelecionado}
                    onChange={(event, newValue) => handleMesChange(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="secondary"
                    textColor="secondary"
                  >
                    {monthe.map((mes: any, index: any) => (
                      <Tab key={index} label={mes.mes} value={mes.value} />
                    ))}
                  </Tabs>
              

              <Box>
                {/* Usa o componente ScrollableDates */}
                <ScrollableDates
                  diasMes={diasMes}
                  diaSelecionado={diaSelecionado}
                  handleDiaClick={handleDiaClick}
                  scrollLeft={scrollLeft}
                  scrollRight={scrollRight}
                />
              </Box>



              <Grid
                container
                spacing={2}
                style={{
                  padding: "0px 57px 0px 61px",
                }}
              >
                {load ? (
                  <Grid
                    item
                    xs={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <CircularProgress color="secondary" />
                  </Grid>
                ) : (
                  <>
                    {horariosDisponiveis.length > 0 ? (
                      horariosDisponiveis.map((horario, index) => (
                        <Grid item xs={3} key={index}>
                          <Button
                            style={{
                              color:
                                horarioSelecionado === horario
                                  ? "white "
                                  : "#9c27b0",
                              width: "100%",
                              background:
                                horarioSelecionado === horario
                                  ? "#9c27b0"
                                  : "white",

                              border:
                                horarioSelecionado === horario
                                  ? "#9c27b0 1px solid"
                                  : "#9c27b0  1px solid",
                            }}
                            onClick={() => handleHorarioClick(horario)}
                          >
                            {horario.start} - {horario.end}
                          </Button>
                        </Grid>
                      ))
                    ) : (
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "50px",
                        }}
                      >
                        Horários indisponíveis
                      </Grid>
                    )}
                  </>
                )}
              </Grid>

              </>
              ) : (
                "Agendas não liberadas "
              )}

            </Box>
          </FormControl>
        )}

        <>
          {isErro && (
            <div style={{ padding: "12px 0px 12px 0px" }}>
              <Alert
                onClose={() => setIsErro(false)}
                onClick={() => setIsErro(false)}
                color="error"
              >
                {"Tente novamente"}
              </Alert>
            </div>
          )}
        </>
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
    </Dialog>
  );
};

export default NovoAgendamentoModal;
