

// export default ProfessionalFormModal;
// components/ProfessionalFormModal.js
import React, { useState, useRef, MutableRefObject } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar"; // Importando componente Avatar
import { FaCheckCircle } from "react-icons/fa";
import './styles.css'
import { Dropdown } from "react-bootstrap";
import { Alert, MenuItem, Tooltip } from "@mui/material";
import { enviarProfissional } from "./sevises/postProfissional";


interface ProfissionalData {
  nome: string;
  cpf: string;
  dataNascimento: string;
  especialidade: string;
  email: string;
  fileInput: File | null;
}


const ProfessionalFormModal = ({ show, handleClose }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");


  const [isSucess , setIsSucess] = useState(false)
  const [isFoto , setIsFoto] = useState(false)
  const [mensagem , setMensagem] = useState('')

  const fileInputRef = useRef<any>(null);

  const handlePhotoChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef?.current.click();
  };

  const defaultAvatar = "/path_to_default_avatar.png"; // Caminho para sua imagem padrão

  const specialties = [
    { value: 'cardiology', label: 'Cardiologia' },
    { value: 'dermatology', label: 'Dermatologia' },
    { value: 'neurology', label: 'Neurologia' },
    { value: 'pediatrics', label: 'Pediatria' },
  ];

const especialidadeIterator = specialties.values();
const firstSpecialty = especialidadeIterator.next().value; // Obter o primeiro valor do iterador
  
  // Exemplo de como passar os dados para a função
const profissionalData: ProfissionalData = {
  nome: name,
  cpf: cpf,
  dataNascimento: birthdate,
  especialidade: firstSpecialty ? firstSpecialty.value : '', // Usar o valor da primeira especialidade, se disponível
  email: email,
  fileInput: document.querySelector('input[type="file"]')?.files?.[0] ?? null
};


// Exemplo de uso
const handleclickSalvar = () => {
  enviarProfissional(profissionalData, 
    (data) => {

      console.log(data.status)
      if(data.status === 500){
        setIsFoto(true)
        setMensagem(data.mensagem)
      }else{
        setIsSucess(true)
        setMensagem(data.mensagem)
       
      }

    }, 
    (error) => {
      setIsFoto(true)
      setMensagem('Aconteceu um erro')
    } 
  );
};


const handleLimpar = ( ) =>{
  setIsSucess(false) 
  setName('')
  setEmail('')
  setCpf('')
  setBirthdate('')
  setSpecialty('')
  setPhoto(null)
  setPreview('')

  // Limpar o campo de entrada de arquivo
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) fileInput.value = '';
}

  return (
    <>


    <Dialog open={show} onClose={handleClose}>

      <DialogTitle>Adicionar Novo Profissional</DialogTitle>
      <DialogContent>
  
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
          <div style={{padding:'12px'}}>
            <Alert onClose={() => setIsFoto(false)} onClick={() => setIsFoto(false)} color="error" > {mensagem}</Alert>
          </div>
        )}
       

       {isSucess && (
          <div style={{padding:'12px'}}>
            <Alert onClose={() => handleLimpar()} onClick={() => setIsSucess(false)} color="success"> Adicionado com sucesso </Alert>
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
          select
          label="Especialidade"
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
          fullWidth
          variant="outlined"
          margin="dense"
        >
          {specialties.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
      <Button className="btn-fechar" onClick={handleClose}>fechar</Button>
      <Button className="btn-salvar" onClick={() => handleclickSalvar()}>Salvar <FaCheckCircle /> </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default ProfessionalFormModal;
