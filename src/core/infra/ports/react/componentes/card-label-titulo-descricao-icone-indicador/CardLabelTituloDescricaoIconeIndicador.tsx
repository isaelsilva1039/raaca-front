import React from "react"
import "./style.css"
import CardLabelTituloDescricaoIconeIndicadorDTO from "../../dto/CardLabelTituloDescricaoIconeIndicadorDTO"

export const CardLabelTituloDescricaoIconeIndicador = (props: { dto: CardLabelTituloDescricaoIconeIndicadorDTO }): JSX.Element => {
    return (
        <div className="card-label-titulo-descricao-icone-indicador">
            <div className="div">
                <div className="div-2">
                    <div className="label">{props.dto.label}</div>
                    <div className="cash">{props.dto.titulo}</div>
                    <div className="text-wrapper">{props.dto.descricao}</div>
                </div>
                {props.dto.variacao > 0 ? (
                    <div className="track-wrapper">
                        <div className="track">
                            <div className="text-wrapper-parabens">Parabéns</div>
                            <img src="./assets/check-green.svg" />
                        </div>
                    </div>
                ) : (
                    <div className="track-wrapper">
                        <div className="track">
                            <div className="text-wrapper-alerta">Precisa de atenção</div>
                            <img src="./assets/alerta.svg" />
                        </div>
                    </div>
                )}
            </div>
            <div className="div-3">
                <div className="root-icone">
                    <div className="icone">
                        {props.dto.icone === "Pix" ? <img src="./assets/pix.svg" alt="SwiftPay" /> : <img src="./assets/pos.svg" alt="SwiftPay" />}
                    </div>
                </div>
                <div className="precentage">
                    {props.dto.variacao > 0 ? (
                        <div className="overlap-group">
                            <div className="text-wrapper-parabens">
                                +{props.dto.variacao.toFixed(2)}%
                            </div>
                            <img
                                className="arrow-drop-up"
                                alt="Arrow drop up"
                                src="./assets/arrow-drop-up.svg"
                            />
                        </div>
                    ) : (
                        <div className="overlap-group">
                            <div className="text-wrapper-alerta">
                                {props.dto.variacao.toFixed(2)}%
                            </div>
                            <img
                                className="arrow-drop-up"
                                alt="Arrow drop up"
                                src="./assets/arrow_drop_down.svg"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}