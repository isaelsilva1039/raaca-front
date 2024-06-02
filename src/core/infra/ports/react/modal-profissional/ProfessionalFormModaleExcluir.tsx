// export default ProfessionalFormModal;
// components/ProfessionalFormModal.js
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
import { Alert, Autocomplete, MenuItem, Tooltip } from "@mui/material";
import { enviarProfissional } from "./sevises/postProfissional";
import LoadingSpinner from "../componentes/load/load";
import { atualizarProfissional } from "./sevises/putProfissional";
import { specialties } from "@/core/helpes/especialidades";
import { deletatProfissional } from "./sevises/deletarProfissional";

interface ProfissionalData {
  id: number;
}

const ProfessionalFormModaleExcluir = ({
  show,
  handleClose,
  profissionail,
  onUpdate = () => {},
  onClose = () => {}
}: any) => {
  const [id, setId] = useState(profissionail.id);
  const [name, setName] = useState(profissionail.nome);
  const [email, setEmail] = useState(profissionail.email);
  const [cpf, setCpf] = useState(profissionail.cpf);
  const [birthdate, setBirthdate] = useState(profissionail.data_nascimento);
  const [specialty, setSpecialty] = useState<any | null>("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isSucess, setIsSucess] = useState(false);
  const [isFoto, setIsFoto] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const fileInputRef = useRef<any>(null);

  const handlePhotoChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef?.current.click();
  };

  const defaultAvatar = profissionail.avatarUrl; // Caminho para sua imagem padrão

  const especialidadeIterator = specialties.values();
  const firstSpecialty = especialidadeIterator.next().value;

  useEffect(() => {
    if (profissionail) {
      setId(profissionail.id);
    }
  }, [profissionail]);


  const dadosDoProfissional: ProfissionalData = {
    id: id
  };

  // Exemplo de uso
  const handleclickSalvar = () => {
    setIsLoading(true);

    deletatProfissional(
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
          onClose()
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

    // Limpar o campo de entrada de arquivo
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) (fileInput as HTMLInputElement).value = "";
  };


  return (
    <>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Excluir profissional</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir profissional ? 
        </DialogContent>
        <DialogActions>
          <Button className="btn-fechar" onClick={handleClose}>
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

export default ProfessionalFormModaleExcluir;
