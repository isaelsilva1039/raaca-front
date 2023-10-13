import React from "react";
import "./style.css";
import { CardTituloDescricaoIconeParams } from "./CardTituloDescricaoIconeParams";
import { Pix } from "@mui/icons-material";
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly'

export const CardTituloDescricaoIcone = (params: CardTituloDescricaoIconeParams): JSX.Element => {
  return (
    <div className="card_titulo_descricao_icone">
      <div className="frame-wrapper">
        <div className="div">
          <div className="cash">{params.titulo}</div>
          <div className="label">{params.descricao}</div>
        </div>
      </div>
      <div className="root-icone">
        <div className="icone">
          {params.icone === "PIX" ? (
            <Pix sx={{
              color: "#4318FF",
              fontSize: "26px",
            }} />
          ) : (
            <MobileFriendlyIcon sx={{
              color: "#4318FF",
              fontSize: "26px",
            }} />
          )}
        </div>
      </div>
    </div>
  );
};