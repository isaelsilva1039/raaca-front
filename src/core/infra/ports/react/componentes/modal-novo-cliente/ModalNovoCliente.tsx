import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { FaCheckCircle } from "react-icons/fa";
import { Autocomplete, CircularProgress, MenuItem, Select } from "@mui/material";
import { salvarNovoCliente } from "@/app/api/clientes/getClientes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ModalNovoCliente = ({
  show,
  handleClose = () => {},
  onUpdate = () => {},
  token = '',
  plans,
  setLoading,
  loading
}: any) => {
  const [nome, setNome] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [cpf, setCpf] = useState<any>();
  const [dataNascimento, setDataNascimento] = useState<any>();
  const [planoSelecionado, setPlanoSelecionado] = useState<any>();
  const [isFormValid, setIsFormValid] = useState(false);

  const handlePlanoChange = (event: any, newValue: any) => {
    setPlanoSelecionado(newValue?.id);
  };

  const closeModal = () => {
    handleClose();
  };


  const handleLimparCampos = () => {
    setPlanoSelecionado(null)
    setNome(null)
    setPlanoSelecionado(null)
    setDataNascimento(null)
    setCpf(null)
    setIsFormValid(false)
  }


  const validateForm = () => {
    if (nome && email && cpf && dataNascimento && planoSelecionado) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [nome, email, cpf, dataNascimento, planoSelecionado]);
  
  const handleSave = () => {

    const clienteData = { nome, email, cpf, dataNascimento, planoSelecionado };
    setLoading(true)
    salvarNovoCliente(
      clienteData,
      token,
      (data) => {
        handleLimparCampos()
        pushNotify("success", "Success", "Cliente adicionado com sucesso !");
        onUpdate();
        closeModal();
        setLoading(false)
      
      },
      (error) => {
        handleLimparCampos()
        setLoading(false);
        pushNotify("error", "Error", "Erro ao salvar cliente");
        console.error("Erro ao salvar cliente:", error);
      }
    );
  };


  const pushNotify = (
    status: "success" | "error" | "info",
    title: string,
    text: string
  ) => {
    toast[status](text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: status,
      className: "notify-custom-margin", // Adiciona a classe CSS personalizada
    });
  };




  return (
    <>
          <ToastContainer />
      <Dialog open={show} onClose={closeModal} fullWidth >

        <DialogTitle>Adicionar novo cliente</DialogTitle>

        {loading ? (
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
            <div
              style={{ display: "flex", gap: "12px", flexDirection: "column" }}
            >
              <TextField
                margin="dense"
                label="Nome"
                type="text"
                fullWidth
                variant="outlined"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="dense"
                label="CPF"
                type="text"
                fullWidth
                variant="outlined"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Data de Nascimento"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
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
              
            </div>
          </DialogContent>
        )}

        <DialogActions>
          <Button className="btn-fechar" onClick={closeModal}>
            Fechar
          </Button>
          <Button 
            className={`btn-salvar ${!isFormValid ? 'btn-disabled' : ''}`}
            onClick={handleSave}  
             disabled={!isFormValid}>
            Salvar <FaCheckCircle />{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalNovoCliente;
