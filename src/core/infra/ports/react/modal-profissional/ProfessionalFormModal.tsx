import React, { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { FaCheckCircle } from "react-icons/fa";
import "./styles.css";
import { Alert, Autocomplete, Tooltip } from "@mui/material";
import { enviarProfissional } from "./sevises/postProfissional";
import LoadingSpinner from "../componentes/load/load";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Especialidade {
  id: number;
  nome: string;
}

interface ProfissionalData {
  nome: string;
  cpf: string;
  dataNascimento: string;
  especialidade: any;
  email: string;
  fileInput: File | null;
  fk_especialidade: any;
  link_sala: any;
}

interface ProfessionalFormModalProps {
  show: boolean;
  handleClose: () => void;
  onUpdate?: () => void;
  especialidades: Especialidade[];
}

const ProfessionalFormModal: React.FC<ProfessionalFormModalProps> = ({
  show,
  handleClose,
  onUpdate = () => {},
  especialidades,
  
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [specialty, setSpecialty] = useState<Especialidade | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSucess, setIsSucess] = useState(false);
  const [isFoto, setIsFoto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [link_sala , setLink_sala] =useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  const hasEmptyFields = () => {
    return (
      !name ||
      !email ||
      !cpf ||
      !birthdate ||
      !specialty ||
      !photo ||
      !preview ||
      !link_sala
    );
  };

  console.log(hasEmptyFields())

  const handleAvatarClick = () => {
    fileInputRef?.current?.click();
  };

  const defaultAvatar = "/path_to_default_avatar.png"; // Caminho para sua imagem padrão

  const profissionalData: ProfissionalData = {
    nome: name,
    cpf: cpf,
    dataNascimento: birthdate,
    especialidade: specialty?.nome,
    email: email,
    fileInput: photo,
    fk_especialidade: specialty?.id,
    link_sala: link_sala
  };

  const handleclickSalvar = () => {
    setIsLoading(true);
    enviarProfissional(
      profissionalData,
      (data) => {

        if (data.status === 500) {
          pushNotify("error", "Error", "Aconteceu um erro");
          setIsLoading(false);
          setIsFoto(true);
          handleLimpar()
        } else {
          pushNotify("success", "Success", "Profissional adicionado com sucesso!");
          setIsLoading(false);
          setIsSucess(true);
          onUpdate();
          handleLimpar()
        }
      },
      (error) => {
        setIsLoading(false);
        setIsFoto(true);
        pushNotify("error", "Error", "Aconteceu um erro");

      }
    );
  };

  const handleLimpar = () => {
    setIsSucess(false);
    setName("");
    setEmail("");
    setCpf("");
    setBirthdate("");
    setSpecialty(null);
    setPhoto(null);
    setPreview("");
    setLink_sala("")

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Profissional</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Avatar
                className="avatar"
                src={preview || defaultAvatar}
                alt="Preview"
                sx={{ width: 100, height: 100, cursor: "pointer" }}
                onClick={handleAvatarClick}
              />
              <input
                type="file"
                ref={fileInputRef}
                hidden
                onChange={handlePhotoChange}
                required
              />
              {isFoto && (
                <div style={{ padding: "12px 0px 12px 0px" }}>
                  <Alert
                    onClose={() => setIsFoto(false)}
                    onClick={() => setIsFoto(false)}
                    color="error"
                  >
                    {mensagem}
                  </Alert>
                </div>
              )}

              {isSucess && (
                <div style={{ padding: "12px 0px 12px 0px" }}>
                  <Alert
                    onClose={() => handleLimpar()}
                    onClick={() => setIsSucess(false)}
                    color="success"
                  >
                    Adicionado com sucesso
                  </Alert>
                </div>
              )}

              <TextField
                margin="dense"
                label="Nome"
                type="text"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
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
                required={true}
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />

              <TextField
                margin="dense"
                label="Link da sala de reunião"
                type="text"
                // placeholder="Link da sala de reunião"
                fullWidth
                variant="outlined"
                value={link_sala}
                onChange={(e) => setLink_sala(e.target.value)}
              />

              <Autocomplete
                options={especialidades}
                getOptionLabel={(especialidade) => especialidade.nome}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Especialidade"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required={true}
                  />
                )}
                onChange={(event, newValue) => {
                  setSpecialty(newValue);
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
      <Button className="btn-fechar-1" onClick={handleClose}>
        Fechar
      </Button>
      <Tooltip
        title={hasEmptyFields() ? "Preencha todos os campos para habilitar o botão." : ""}
        arrow
      >
        <span>
          <Button
            disabled={hasEmptyFields()}
            className={!hasEmptyFields() ? "btn-salvar-1" : 'btn-salvar-1 disabled'  }
            onClick={handleclickSalvar}
          >
            Salvar <FaCheckCircle />
          </Button>
        </span>
      </Tooltip>
    </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfessionalFormModal;
