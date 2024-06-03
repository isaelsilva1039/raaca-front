import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { FaCheckCircle } from "react-icons/fa";
import "./styles.css";
import { Alert } from "@mui/material";
import LoadingSpinner from "../componentes/load/load";
import { deletarProfissional } from "./sevises/deletarProfissional";

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
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    console.log("profissionail na Modal:", profissionail); // Log para depuração
    if (profissionail && profissionail.id) {
      setId(profissionail.id);
      setName(profissionail.nome);
    } else {
      setId(null);
      setName("");
    }
  }, [profissionail]);

  const handleClickSalvar = () => {
    setIsLoading(true);

    if (id === null) {
      setIsError(true);
      setMensagem("ID do profissional é inválido.");
      setIsLoading(false);
      return;
    }

    const dadosDoProfissional: ProfissionalData = {
      id: id,
    };

    deletarProfissional(
      dadosDoProfissional,
      (data) => {
        setIsLoading(false);
        if (data.status === "success") {
          setIsSuccess(true);
          setMensagem("Excluído com sucesso");
          handleLimpar();
          onUpdate();
          onClose();
        } else {
          setIsError(true);
          setMensagem(data.message || "Erro ao excluir profissional");
        }
      },
      (error) => {
        setIsLoading(false);
        setIsError(true);
        setMensagem(error.message || "Erro ao excluir profissional");
      }
    );
  };

  const handleLimpar = () => {
    setId(null);
    setName("");
    setMensagem("");
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Excluir profissional</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {isError && (
              <div style={{ padding: "12px 0px 12px 0px" }}>
                <Alert onClose={() => setIsError(false)} severity="error">
                  {mensagem}
                </Alert>
              </div>
            )}

            {isSuccess && (
              <div style={{ padding: "12px 0px 12px 0px" }}>
                <Alert onClose={() => setIsSuccess(false)} severity="success">
                  {mensagem}
                </Alert>
              </div>
            )}

            <p>Tem certeza que deseja excluir o profissional {name}?</p>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button className="btn-fechar" onClick={handleClose}>
          Fechar
        </Button>
        <Button className="btn-excluir" onClick={handleClickSalvar} disabled={isLoading}>
          Excluir <FaCheckCircle />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfessionalFormModaleExcluir;
