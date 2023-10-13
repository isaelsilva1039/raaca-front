import React from "react";
import "./style.css";
import { CardTituloDescricaoIconeParams } from "./CardTituloDescricaoIconeParams";
export const CardTituloDescricaoIcone = (params: CardTituloDescricaoIconeParams): JSX.Element => {
  return (
    <div className="card_titulo_descricao_icone">
      <div className="frame-wrapper">
        <div className="div">
          <div className="cash">{params.titulo}</div>
          <div className="label">{params.descricao}</div>
        </div>
      </div>
      <img className="img" alt="Frame" src={params.icone} />
    </div>
  );
};