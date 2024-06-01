import React, { useEffect, useState, useRef } from "react";
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
import LoadingSpinner from "../componentes/load/load";
import { specialties } from "@/core/helpes/especialidades";

interface ProfissionalData {
  nome: string;
  cpf: string;
  dataNascimento: string;
  especialidade: string;
  email: string;
  fileInput: File | null;
}

const ProfessionalFormModal = ({
  show,
  handleClose,
  onUpdate = () => {},
}: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [specialty, setSpecialty] = useState<any>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFoto, setIsFoto] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

 useEffect(() => {
  // Limpa o campo de arquivo quando 'photo' é removido ou alterado
  if (fileInputRef.current && photo === null) {
    fileInputRef.current.value = "";
  }
}, [photo]);


  const handleSaveClick = () => {
    setIsLoading(true);
    // Assume enviarProfissional is your function to submit the professional data
    // Replace with actual function call
    console.log("Saving professional:", { name, email, cpf, birthdate, specialty, fileInput: photo });
    setIsLoading(false);
    setIsSuccess(true); // Set success message
    onUpdate(); // Callback function to update parent component
  };

  const handleClear = () => {
    setIsSuccess(false);
    setName("");
    setEmail("");
    setCpf("");
    setBirthdate("");
    setSpecialty('');
    setPhoto(null);
    setPreview("");
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Adicionar Novo Profissional</DialogTitle>
      <DialogContent>
        {isLoading ? <LoadingSpinner /> : (
          <>
            <Avatar
              className="avatar"
              src={preview || "/path_to_default_avatar.png"}
              alt="Avatar Preview"
              sx={{ width: 100, height: 100, cursor: "pointer" }}
              onClick={handleAvatarClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              hidden
              onChange={handlePhotoChange}
            />
            {isFoto && (
              <Alert severity="error" onClose={() => setIsFoto(false)}>
                {mensagem}
              </Alert>
            )}
            {isSuccess && (
              <Alert severity="success" onClose={handleClear}>
                Adicionado com sucesso
              </Alert>
            )}
            <TextField
              label="Nome"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="CPF"
              type="text"
              fullWidth
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <TextField
              label="Data de Nascimento"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            <Autocomplete
              options={specialties}
              getOptionLabel={(option) => option.label}
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
                setSpecialty(newValue?.value);
              }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
        <Button onClick={handleSaveClick}>
          Salvar <FaCheckCircle />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfessionalFormModal;
