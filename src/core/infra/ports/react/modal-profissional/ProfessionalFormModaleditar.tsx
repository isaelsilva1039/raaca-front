import React, { useState, useRef, useEffect } from "react";
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
import { atualizarProfissional } from "./sevises/putProfissional";

interface ProfissionalData {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  especialidade: string;
  email: string;
  fileInput: File | null;
}

const ProfessionalFormModaleditar = ({
  show,
  handleClose,
  profissionail,
  onUpdate = () => {},
}: any) => {
  const [id, setId] = useState(profissionail.id);
  const [name, setName] = useState(profissionail.nome);
  const [email, setEmail] = useState(profissionail.email);
  const [cpf, setCpf] = useState(profissionail.cpf);
  const [birthdate, setBirthdate] = useState(profissionail.data_nascimento);
  const [specialty, setSpecialty] = useState<any | null>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState(profissionail.avatarUrl || "");
  const [isLoading, setIsLoading] = useState(false);

  const [isSucess, setIsSucess] = useState(false);
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
    if (profissionail) {
      setId(profissionail.id);
      setName(profissionail.nome);
      setEmail(profissionail.email);
      setCpf(profissionail.cpf);
      setBirthdate(profissionail.data_nascimento);
      setSpecialty(profissionail.especialidade);

      if (profissionail.avatarUrl) {
        setPreview(profissionail.avatarUrl);
      }
    }
  }, [profissionail]);

  const handleclickSalvar = () => {
    setIsLoading(true);

    const dadosDoProfissional: ProfissionalData = {
      id,
      nome: name,
      cpf,
      dataNascimento: birthdate,
      especialidade: specialty,
      email,
      fileInput: fileInputRef.current?.files?.[0] ?? null,
    };

    atualizarProfissional(
      dadosDoProfissional,
      (data) => {
        if (data.original.status === 400) {
          setIsLoading(false);
          setIsFoto(true);
          setMensagem(data.original.mensagem);
        } else {
          setIsLoading(false);
          setIsSucess(true);
          setMensagem(data.original.mensagem);
          handleLimpar();
          onUpdate();
        }
      },
      (error) => {
        setMensagem(error.mensagem);
        setIsSucess(false);
      }
    );
  };

  const handleLimpar = () => {
    setName("");
    setEmail("");
    setCpf("");
    setBirthdate("");
    setSpecialty("");
    setPhoto(null);
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Editar Profissional</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Avatar
              className="avatar"
              src={preview || profissionail.avatarUrl || "/path_to_default_avatar.png"}
              alt="Preview"
              sx={{ width: 100, height: 100, cursor: "pointer" }}
              onClick={handleAvatarClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              hidden
              onChange={handlePhotoChange}
              accept="image/png, image/jpeg"
            />
            {isFoto && (
              <div style={{ padding: "12px 0px 12px 0px" }}>
                <Alert
                  onClose={() => setIsFoto(false)}
                  color="error"
                >
                  {mensagem}
                </Alert>
              </div>
            )}

            {isSucess && (
              <div style={{ padding: "12px 0px 12px 0px" }}>
                <Alert
                  onClose={() => setIsSucess(false)}
                  color="success"
                >
                  Editado com sucesso
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
        <Button className="btn-fechar" onClick={handleClose}>
          fechar
        </Button>
        <Button className="btn-salvar" onClick={handleclickSalvar}>
          Salvar <FaCheckCircle />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfessionalFormModaleditar;
