import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FaReplyAll } from "react-icons/fa6";
import './InteracoesChamado.css';
import NovaInteracaoDialog from "./new-inretacao";  
import { postChamados } from "@/app/api/chamados.tsx/service";
import AvatarPlaceholder from "../AvatarPlaceholder/AvatarPlaceholder";

interface IInteracao {
  id: number;
  assunto: string;
  criado_por: {
    avatar: string;
    name: string;
  };
  created_at: string;
}

interface IChamado {
  id: number;
  interacoes: IInteracao[];
  chave: string
}

interface InteracoesChamadoProps {
  chamado: IChamado;
  onAddInteracao: (chave: string, assunto: string, status: string) => void;
}

const InteracoesChamado: React.FC<InteracoesChamadoProps> = ({
  chamado,
  onAddInteracao,
}) => {
  const [open, setOpen] = useState(false);
  const [newInteracao, setNewInteracao] = useState("");
  const [status, setStatus] = useState<string>("1");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewInteracao("");
    setStatus('1')
  };

  const handleAddInteracao = () => {
    onAddInteracao(chamado.chave, newInteracao, status );
    handleClose();
  };


  return (
    <>
      <div className="interacoes-container">
        <div style={{padding:'0px 0px 20px 0px'}}>
          <a className="responder-button" onClick={handleClickOpen}>
            Responder interações <FaReplyAll size={18} />
          </a>
        </div>
        {chamado?.interacoes?.slice().reverse().map((interacao) => (
          <div key={interacao.id} className="interacao-item">
            <AvatarPlaceholder
                avatarUrl={interacao.criado_por?.avatar}
                name={interacao.criado_por?.name || "Desconhecido"}
                />
            <div className="interacao-content">
              <Typography variant="body1">
                <strong>{interacao.criado_por?.name}</strong>
              </Typography>
              <Typography
                variant="body2"
                className="interacao-assunto"
              >
                <span dangerouslySetInnerHTML={{ __html: interacao.assunto }} />
              </Typography>
              <Typography variant="caption" className="interacao-date">
                {new Date(interacao?.created_at).toLocaleString()}
              </Typography>
            </div>
          </div>
        ))}

        <NovaInteracaoDialog
          open={open}
          onClose={handleClose}
          onAddInteracao={handleAddInteracao}
          newInteracao={newInteracao}
          setNewInteracao={setNewInteracao}
          chaveChamado={chamado?.chave}
          setStatus={setStatus}
          status={status}
        />
      </div>
    </>
  );
};

export default InteracoesChamado;
