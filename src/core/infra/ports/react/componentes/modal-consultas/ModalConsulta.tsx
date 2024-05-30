import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar"; // Importando componente Avatar
import { FaCheckCircle } from "react-icons/fa";
import "./styles.css";
import { Dropdown } from "react-bootstrap";
import {
  Alert,
  Autocomplete,
  CircularProgress,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { liberarConsultas } from "@/app/api/clientes/getClientes";

const ModalConsulta = ({
  show,
  handleClose,
  cliente,
  onUpdate = () => {},
  onClose = () => {},
  token,
}: any) => {
  const [id, setId] = useState(cliente.id);
  const [isLoading, setIsLoading] = useState(false);

  const [quantidadeConsultas, setQuantidadeConsultas] = useState<any>(cliente?.user?.consultas[0]?.quantidade_consultas);
  const [inicioData, setInicioData] = useState(cliente?.user?.consultas[0]?.inicio_data);
  const [fimData, setFimData] = useState(cliente?.user?.consultas[0]?.fim_data);


  console.log(cliente?.user?.consultas[0]?.inicio_data)

  useEffect(() => {
    if (cliente) {
      setId(cliente.id);
      setQuantidadeConsultas(cliente?.user?.consultas[0]?.quantidade_consultas);
      setInicioData(cliente?.user?.consultas[0]?.inicio_data)
      setFimData(cliente?.user?.consultas[0]?.fim_data)
    }
  }, [cliente]);


  const closeModal = () =>{ 
    handleLimpar()
    handleClose()
  }

  const handleclickSalvar = () => {
    if (!cliente.user_id) return;
    setIsLoading(true);
    liberarConsultas(
      cliente.user_id,
      token,
      quantidadeConsultas,
      inicioData,
      fimData,
      (data) => {
        onUpdate();
        setIsLoading(false);
        handleLimpar()
      },
      (error) => {
        setIsLoading(false);
      }
    );
  };

  const handleLimpar = () => {
    setInicioData("")
    setFimData("")
    setQuantidadeConsultas(0)
  };

  return (
    <>
      <Dialog open={show} onClose={closeModal}>
        <DialogTitle>Adicionar consulta ao cliente</DialogTitle>

        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <DialogContent>
            <TextField
              margin="dense"
              label="Quantidade de consultas"
              type="number"
              fullWidth
              variant="outlined"
              value={quantidadeConsultas}
              onChange={(e) => setQuantidadeConsultas(e.target.value)}
            />
            <div
              style={{ display: "flex", gap: "12px", flexDirection: "column" }}
            >
              <text> Prazo para realizar as consultas</text>
              <div style={{ display: "flex", gap: "12px" }}>
                <TextField
                  margin="dense"
                  label="De "
                  type="date"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={inicioData}
                  onChange={(e) => setInicioData(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Ate"
                  type="date"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={fimData}
                  onChange={(e) => setFimData(e.target.value)}
                />
              </div>
            </div>
          </DialogContent>
        )}

        <DialogActions>
          <Button className="btn-fechar" onClick={closeModal}>
            fechar
          </Button>
          <Button className="btn-salvar" onClick={() => handleclickSalvar()}>
            Salvar <FaCheckCircle />{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalConsulta;
