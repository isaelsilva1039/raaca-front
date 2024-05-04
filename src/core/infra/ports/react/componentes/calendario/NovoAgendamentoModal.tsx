import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import "./styles.css";
import CloseIcon from "@mui/icons-material/Close";
import { startOfDay } from "date-fns";
import { getDisponibilidade } from "@/app/api/horarios/getDisponilibilida";
import { useCliente } from "@/core/helpes/UserContext";
import { FcInfo } from "react-icons/fc";
import { TbPointFilled } from "react-icons/tb";
import { postNovoAgendamento } from "@/app/api/horarios/posAgendamento";



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

interface Evento {
  medicoId: number;
  horario: string;
  descricao: string;
}

interface Horario {
  start: string;
  end: string;
}

const NovoAgendamentoModal: React.FC<Props> = ({
  open,
  handleClose,
  medicos,
  onUpdate,
}) => {
  const [medicoSelecionado, setMedicoSelecionado] = useState<number | string>(
    ""
  );
  const [horario, setHorario] = useState<Horario>({ start: "", end: "" });

  const [horariosDisponiveis, setHorariosDisponiveis] = useState<Horario[]>([]);
  const [descricao, setDescricao] = useState<string>("");
  const { token } = useCliente();
  const [alerta, setAlerta] = useState<any>({
    aberto: false,
    tipo: "info",
    mensagem: "",
  });

  const [mensagem, setMensagem] = useState<number | string>("");
  const [isLiberadoEventoNovo, setIsLiberadoMarcarEvento] =
    useState<boolean>(false);

  const salvarAgendamento = (): void => {
    
    postNovoAgendamento(
      medicoSelecionado,
      horario.start,
      horario.end,
      token,
      (data : any ) => {
        setMensagem(data.mensagem);
        setIsLiberadoMarcarEvento(false);

        setAlerta({
          aberto: true,
          tipo: "success",
          mensagem: data.mensagem,
        });

        handleClear()
        setIsLiberadoMarcarEvento(false);

      },
      (error : any) => {
        setMensagem(error?.mensagem);
        setIsLiberadoMarcarEvento(false);
      },

    ) 
      onUpdate()
      setIsLiberadoMarcarEvento(false);
  };



  const handleClear = () => {
    setMedicoSelecionado('')
    setMensagem('');
    setHorario({
      start: '', end:''
    })

    setIsLiberadoMarcarEvento(false);
  }

  useEffect(() => {
    if (medicoSelecionado && horario.start && horario.end) {
      verificarDisponibilidade();
    }
  }, [medicoSelecionado, horario, token]);

  const verificarDisponibilidade = () => {
    getDisponibilidade(
      medicoSelecionado,
      horario.start,
      horario.end,
      (data) => {
        setMensagem(data.mensagem);
        setIsLiberadoMarcarEvento(data.erro);

        if(data.erro){
          setAlerta({
            aberto: data.erro,
            tipo: "info",
            mensagem: data.mensagem,
          });
        }
     

        if(!data.erro){
          setAlerta({
            aberto: true,
            tipo: "success",
            mensagem: 'Horario livre',
          });
        }

      },
      (error) => {
        setMensagem(error?.mensagem);
        setIsLiberadoMarcarEvento(false);
      },
      token
    );

    setIsLiberadoMarcarEvento(false);
  };

  const [slots, setSlots] = useState(() => {
    const today = new Date();
    const startOfToday = startOfDay(today);
    return [
      { start: startOfToday.toISOString(), end: startOfToday.toISOString() },
    ];
  });

  const handleTimeChange = (field: keyof Horario, value: string) => {
    setHorario((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="agenda-titele">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: "absolute", right: "8px", top: "8px" }}
        >
          <CloseIcon />
        </IconButton>
        <div style={{padding: '0px 0px 20px 0'}}>
          <text>Novo agendamento</text>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap:'8px',
            fontWeight:200
          }}
        >
          <div>
            <FcInfo size={42} />
          </div>
          <div style={{fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <a><TbPointFilled /> Selecione um profissional para habilitar os campos de data.</a>
              <a><TbPointFilled /> Verifique a disponibilidade ao definir as datas de início e fim.</a>
              <a><TbPointFilled /> Confirme as informações para ativar o botão de salvar.</a>
          </div>

        </div>
      </DialogTitle>

      <DialogContent className="container-modal">
        <FormControl fullWidth>
          <Select
            labelId="medico-label"
            className="menu-profissionais-lista-item"
            value={medicoSelecionado}
            label="Profissional"
            onChange={(e) => setMedicoSelecionado(e.target.value)}
          >
            {medicos?.map((medico) => (
              <MenuItem
                key={medico?.user_id}
                value={medico?.user_id}
                className="menu-profissionais-lista"
              >
                <img className="profile-image" src={medico.avatarUrl} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {medico.nome}
                  <small> {medico.especialidade}</small>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ display: "flex", gap: "10px" }}>
          {slots.map((slot, index) => (
            <>
              <div key={index}>
                <TextField
                  label="Início"
                  type="datetime-local"
                  value={horario.start}
                  onChange={(e) => handleTimeChange("start", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "250px" }}
                  disabled={!medicoSelecionado} // Disable until a doctor is selected
                />
                <TextField
                  label="Fim"
                  type="datetime-local"
                  value={horario.end}
                  onChange={(e) => handleTimeChange("end", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "250px" }}
                  disabled={!medicoSelecionado} // Disable until a doctor is selected
                />
              </div>
              {alerta.aberto && (
                <Alert
                  severity={alerta.tipo}
                  onClose={() =>
                    setAlerta((prev:any) => ({ ...prev, aberto: false }))
                  }
                >
                  <AlertTitle>
                    {alerta.tipo.charAt(0).toUpperCase() + alerta.tipo.slice(1)}
                  </AlertTitle>
                  {alerta.mensagem}
                </Alert>
              )}


            </>
          ))}
        </FormControl>
        <TextField
          fullWidth
          label="Descrição"
          variant="outlined"
          margin="normal"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={salvarAgendamento} disabled={isLiberadoEventoNovo}>
          Salvar <FaCheckCircle />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NovoAgendamentoModal;
