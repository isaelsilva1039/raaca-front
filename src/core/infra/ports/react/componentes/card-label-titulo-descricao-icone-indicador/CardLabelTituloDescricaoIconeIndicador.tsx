import React from "react"
import "./style.css"
import CardLabelTituloDescricaoIconeIndicadorDTO from "../../dto/CardLabelTituloDescricaoIconeIndicadorDTO"
import { Pix } from "@mui/icons-material"
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly'
import { styleIcon } from "./style"

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
                        {props.dto.icone === "Pix" ? (<Pix sx={styleIcon} />) : (<MobileFriendlyIcon sx={styleIcon} />)}
                    </div>
                </div>
                <div className="precentage">
                    {props.dto.variacao > 0 ? (
                        <div className="overlap-group">
                            <div className="text-wrapper-3">
                                +{props.dto.variacao.toFixed(2)}%
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
                                -{props.dto.variacao.toFixed(2)}%
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
    )
}