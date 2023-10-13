import React from "react";
import "./style.css";
import CardLabelTituloDescricaoIconeIndicadorProps from "../periodo-titulo-descricao-indicador/CardLabelTituloDescricaoIconeIndicadorProps";

export const CardLabelTituloDescricaoIconeIndicador = (props: CardLabelTituloDescricaoIconeIndicadorProps): JSX.Element => {
    return (
        <div className="card-label-titulo-descricao-icone-indicador">
            <div className="div">
                <div className="div-2">
                    <div className="label">{props.label}</div>
                    <div className="cash">{props.titulo}</div>
                    <div className="text-wrapper">{props.descricao}</div>
                </div>
                {props.variacao > 0 ? (
                    <div className="track-wrapper">
                        <div className="track">
                            <div className="text-wrapper-2">Parabéns</div>
                            <img className="img" alt="Frame" src="https://c.animaapp.com/3xag2zkK/img/frame-5.svg" />
                        </div>
                    </div>
                ) : (
                    <div className="track-wrapper">
                        <div className="track">
                            <div className="text-wrapper-2">Parabéns</div>
                            <img className="img" alt="Frame" src="https://c.animaapp.com/3xag2zkK/img/frame-5.svg" />
                        </div>
                    </div>
                )}
            </div>
            <div className="div-3">
                <img className="img-2" alt="Frame" src="https://c.animaapp.com/3xag2zkK/img/frame-52.svg" />
                <div className="precentage">
                    {props.variacao > 0 ? (
                        <div className="overlap-group">
                            <div className="text-wrapper-3">
                                +{props.variacao.toFixed(2)}%
                            </div>
                            <img
                                className="arrow-drop-up"
                                alt="Arrow drop up"
                                src="https://c.animaapp.com/3xag2zkK/img/arrow-drop-up.svg"
                            />
                        </div>
                    ) : (
                        <div className="overlap-group">
                            <div className="text-wrapper-3">
                                -{props.variacao.toFixed(2)}%
                            </div>
                            <img
                                className="arrow-drop-up"
                                alt="Arrow drop up"
                                src="https://c.animaapp.com/3xag2zkK/img/arrow-drop-up.svg"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};