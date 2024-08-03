import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { BiSolidMegaphone } from "react-icons/bi";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Importa o tema do Quill
import { FaCheckCircle } from "react-icons/fa";
import { useCliente } from "@/core/helpes/UserContext";

interface NovaInteracaoDialogProps {
  open: boolean;
  onClose: () => void;
  onAddInteracao: (status: string) => void;
  newInteracao: string;
  setNewInteracao: (value: string) => void;
  chaveChamado: string;
  setStatus : (value: string) => void;
  status: string;
}

const NovaInteracaoDialog: React.FC<NovaInteracaoDialogProps> = ({
  open,
  onClose,
  onAddInteracao,
  newInteracao,
  setNewInteracao,
  chaveChamado,
  setStatus,
  status
}) => {

  const { token, user } = useCliente();

  const handleSend = () => {
    onAddInteracao(status);
    onClose();
  };

  {console.log(user.tipo)}

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"lg"}>
      <DialogTitle
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <BiSolidMegaphone color="#707EAE" /> Interação
        </div>
        <MdClose
          onClick={onClose}
          style={{ cursor: "pointer" }}
          size={20}
          color="#707EAE"
        />
      </DialogTitle>

      <DialogContent style={{ minHeight: "300px", height: "fit-content" }}>
        <ReactQuill
          value={newInteracao}
          onChange={setNewInteracao}
          modules={{
            toolbar: [
              [{ font: [] }],
              [{ size: ["small", false, "large", "huge"] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["link", "image"],
              ["clean"],
            ],
          }}
          formats={[
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "align",
            "link",
            "image",
          ]}
          style={{ height: "fit-content" }}
        />

        {user.tipo == 1 && (
          <FormControl fullWidth style={{ marginTop: "20px" }}>
            <InputLabel>Situção</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Situção"
            >
              <MenuItem value={1}>Aberto</MenuItem>
              <MenuItem value={2}>Pendente Cliente</MenuItem>
              <MenuItem value={3}>Finalizado</MenuItem>
            </Select>
          </FormControl>
        )}
      </DialogContent>

      <DialogActions>
        <Button style={{ color: "black" }} onClick={onClose}>
          Cancelar
        </Button>
        <Button className="btn-salvar" onClick={handleSend} disabled={!status}>
          Enviar <FaCheckCircle />{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NovaInteracaoDialog;
