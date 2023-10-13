import React from "react";
import "./style.css";
import CardLabelTituloDescricaoIconeIndicadorProps from "./CardLabelTituloDescricaoIconeIndicadorProps";
import { Pix } from "@mui/icons-material";
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly'

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
                <div className="root-icone">
                    <div className="icone">
                        {props.icone === "Pix" ? (
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