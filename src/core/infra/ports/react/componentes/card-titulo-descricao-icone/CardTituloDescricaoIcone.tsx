import React from "react"
import "./style.css"
import { CardTituloDescricaoIconeDTO } from "../../dto/CardTituloDescricaoIconeDTO"

export const CardTituloDescricaoIcone = (props: { dto: CardTituloDescricaoIconeDTO }): JSX.Element => {
  return (
    <div className="card_titulo_descricao_icone">
      <div className="frame-wrapper">
        <div className="div">
          <div className="cash">{props.dto.titulo}</div>
          <div className="label">{props.dto.descricao}</div>
        </div>
      </div>
      <div className="root-icone">
        <div className="icone">
          {props.dto.icone === "PIX" ? (
             <img src="./assets/pix.svg" alt="SwiftPay" />
          ) : (
            <img src="./assets/pos.svg" alt="SwiftPay" />
          )}
        </div>
      </div>
    </div>
  )
}