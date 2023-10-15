import React from "react";
import "./style.css";
import Calendar from "@mui/icons-material/CalendarToday";
import PeriodoTituloDescricaoIndicadorDTO from "../../dto/PeriodoTituloDescricaoIndicadorDTO";

export const PeriodoTituloDescricaoIndicador = (props: { dto: PeriodoTituloDescricaoIndicadorDTO }): JSX.Element => {
    return (
        <div className="periodo-titulo-descricao-indicador">
            <div className="timeline-button">
                <Calendar className="calendar-today" />
                <div className="text-wrapper">Este mês</div>
            </div>
            <div className="div">
                <div className="price">{props.dto.titulo}</div>
                <div className="div-2">
                    <div className="label-wrapper">
                        <div className="label">{props.dto.descricao}</div>
                    </div>
                    <div className="precentage">
                        {props.dto.variacao > 0 ? (
                            <>
                                <div className="overlap-group">
                                    <div className="text-wrapper-up">+{props.dto.variacao.toFixed(2)}%</div>
                                    <img
                                        className="arrow-drop-up"
                                        alt="Arrow drop up"
                                        src="./assets/arrow-drop-up.svg"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="overlap-group">
                                <div className="text-wrapper-down">{props.dto.variacao.toFixed(2)}%</div>
                                <img
                                    className="arrow-drop-up"
                                    alt="Arrow drop up"
                                    src="./assets/arrow_drop_down.svg"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="track-wrapper">
                    <div className="track">
                        {props.dto.variacao > 0 ? (
                            <>
                                <div className="text-wrapper-parabens">Parabéns</div>
                                <img src="./assets/check-green.svg" />
                            </>
                        ) : (
                            <>
                                <div className="text-wrapper-alerta">Precisa de atenção</div>
                                <img src="./assets/alerta.svg" />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};