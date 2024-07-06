import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { FaCheckCircle } from "react-icons/fa";
import "./styles.css";
import {
  Alert,
  Autocomplete,
  CircularProgress,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { liberarConsultas } from "@/app/api/clientes/getClientes";
import { putPlanoCliente } from "@/app/api/planos/planosService";

const ModalEditarCliente = ({
  show,
  handleClose,
  cliente,
  onUpdate = () => {},
  onClose = () => {},
  token,
  planos,
  loadingEdit,
}: any) => {
  const [id, setId] = useState(cliente.id);
  const [isLoading, setIsLoading] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState<any>(null);

  useEffect(() => {
    if (cliente) {
      setId(cliente.id);
      // Inicializa o plano selecionado com o plano do cliente, se existir
      const planoCliente = planos.find(
        (plano: any) => plano.id === cliente.fk_plano
      );
      setPlanoSelecionado(planoCliente || null);
    }
  }, [cliente, planos]);

  const closeModal = () => {
    handleClose();
  };

  const handleClickSalvar = async () => {
    try {
      if (!cliente.user_id) return;
      setIsLoading(true);

      const data = {
        id: cliente.id,
        plano_id: planoSelecionado ? planoSelecionado.id : null,
      };

      await putPlanoCliente(data);
      onUpdate()
      setIsLoading(false);

    } catch (error: any) {
      setIsLoading(false);

    } finally {
      setIsLoading(false);
    }
  };


  const handlePlanoChange = (event: any, newValue: any) => {
    setPlanoSelecionado(newValue);
  };

  return (
    <>
      <Dialog open={show} onClose={closeModal}>
        <DialogTitle>Adicionar consulta ao cliente</DialogTitle>

        {isLoading || loadingEdit ? (
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
            <Autocomplete
              value={planoSelecionado}
              onChange={handlePlanoChange}
              options={planos}
              getOptionLabel={(option) => option.nome_plano}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione o plano"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </DialogContent>
        )}

        <DialogActions>
          <Button className="btn-fechar" onClick={closeModal}>
            Fechar
          </Button>
          <Button className="btn-salvar" onClick={handleClickSalvar}>
            Salvar <FaCheckCircle />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalEditarCliente;
