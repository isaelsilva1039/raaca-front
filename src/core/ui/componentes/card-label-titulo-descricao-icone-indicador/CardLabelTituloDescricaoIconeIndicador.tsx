import React from "react";
import "./style.css";

export const CardLabelTituloDescricaoIconeIndicador = (): JSX.Element => {
    return (
        <div className="card-label-titulo-descricao-icone-indicador">
            <div className="div">
                <div className="div-2">
                    <div className="label">PIX</div>
                    <div className="cash">R$ 999.999,99</div>
                    <div className="text-wrapper">Ticket médio POS</div>
                </div>
                <div className="track-wrapper">
                    <div className="track">
                        <div className="text-wrapper-2">Parabéns</div>
                        <img className="img" alt="Frame" src="https://c.animaapp.com/3xag2zkK/img/frame-5.svg" />
                    </div>
                </div>
            </div>
            <div className="div-3">
                <img className="img-2" alt="Frame" src="https://c.animaapp.com/3xag2zkK/img/frame-52.svg" />
                <div className="precentage">
                    <div className="overlap-group">
                        <div className="text-wrapper-3">+2.45%</div>
                        <img
                            className="arrow-drop-up"
                            alt="Arrow drop up"
                            src="https://c.animaapp.com/3xag2zkK/img/arrow-drop-up.svg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};