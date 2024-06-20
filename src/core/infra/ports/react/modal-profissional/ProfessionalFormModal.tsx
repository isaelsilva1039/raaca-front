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
import { Alert, Autocomplete } from "@mui/material";
import { enviarProfissional } from "./sevises/postProfissional";
import LoadingSpinner from "../componentes/load/load";
import { specialties } from "@/core/helpes/especialidades";

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
        console.log(data.status);
        if (data.status === 500) {
          setIsLoading(false);
          setIsFoto(true);
          setMensagem(data.mensagem);
        } else {
          setIsLoading(false);
          setIsSucess(true);
          setMensagem(data.mensagem);
          onUpdate();
        }
      },
      (error) => {
        setIsLoading(false);
        setIsFoto(true);
        setMensagem("Esse cpf já existe");
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

  return (
    <>
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
          <Button className="btn-fechar" onClick={handleClose}>
            Fechar
          </Button>
          <Button className="btn-salvar" onClick={handleclickSalvar}>
            Salvar <FaCheckCircle />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfessionalFormModal;
