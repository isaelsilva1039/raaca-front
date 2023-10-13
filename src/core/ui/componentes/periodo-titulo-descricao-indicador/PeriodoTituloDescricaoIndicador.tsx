import React from "react";
import "./style.css";
import Calendar from "@mui/icons-material/CalendarToday";
import PeriodoTituloDescricaoIndicadorProps from "./PeriodoTituloDescricaoIndicadorProps";

export const PeriodoTituloDescricaoIndicador = (props: PeriodoTituloDescricaoIndicadorProps): JSX.Element => {
    return (
        <div className="periodo-titulo-descricao-indicador">
            <div className="timeline-button">
                <Calendar className="calendar-today" />
                <div className="text-wrapper">Este mês</div>
            </div>
            <div className="div">
                <div className="price">{props.titulo}</div>
                <div className="div-2">
                    <div className="label-wrapper">
                        <div className="label">{props.descricao}</div>
                    </div>
                    <div className="precentage">
                        <div className="overlap-group">
                            <div className="text-wrapper-2">+2.45%</div>
                            <img
                                className="arrow-drop-up"
                                alt="Arrow drop up"
                                src="https://c.animaapp.com/ltVr5tk8/img/arrow-drop-up.svg"
                            />
                        </div>
                    </div>
                </div>
                <div className="track-wrapper">
                    <div className="track">
                        <div className="text-wrapper-3">Parabéns</div>
                        <img className="img" alt="Frame" src="https://c.animaapp.com/ltVr5tk8/img/frame-5.svg" />
                    </div>
                </div>
            </div>
        </div>
    );
};