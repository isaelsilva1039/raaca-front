import React, { useState, useRef } from "react";
import "./MedicosHorizontalList.css";

interface Medico {
  user_id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
  fk_especialidade: any;
}

interface Props {
  medicos: Medico[];
  medicoSelecionado: number | string;
  setMedicoSelecionado: (value: number | string) => void;
  profissional: any;
  setEspecialidadeProfissional: (value: number | string) => void;
}

export interface Especialidade {
  id: number;
  nome: string;
}

export interface Periodo {
  inicio_data: string;
  fim_data: string;
  consultas_no_periodo: number;
}

export interface Profissional {
  nome: string;
  email: string;
  cpf: string;
  data_nascimento: string;
  especialidade: Especialidade;
  avatar: string;
  fk_anexo: number;
  user_id: number;
  updated_at: string;
  fk_especialidade: number;
  link_sala: string;
  created_at: string;
  deleted_at: string | null;
}

const MedicosHorizontalList: React.FC<Props> = ({
  medicos,
  medicoSelecionado,
  setMedicoSelecionado,
  profissional,
  setEspecialidadeProfissional,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (
      !isDragging ||
      !scrollContainerRef.current ||
      startX === null ||
      scrollLeft === null
    )
      return;

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Ajuste o valor para a velocidade de deslizamento
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scrollLeftFunc = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -120, behavior: "smooth" }); // Ajuste a distância de rolagem
    }
  };

  const scrollRightFunc = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 120, behavior: "smooth" }); // Ajuste a distância de rolagem
    }
  };

  const handleProfissionalSelecionado = (profissional: any) => {
    console.log("profissional", profissional);
    setMedicoSelecionado(profissional?.user_id);
    setEspecialidadeProfissional(profissional?.especialidade?.id ?? profissional?.fk_especialidade);
  };

  return (
    <div className="container-horizontal-list">
      <button className="button-scroll" onClick={scrollLeftFunc}>
        &larr;
      </button>
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="scroll-container"
      >
        {profissional < 1 && (
          <>
            {medicos.map((medico) => (
              <div
                key={medico.user_id}
                onClick={() => handleProfissionalSelecionado(medico)}
                className={`medico-card ${
                  medicoSelecionado === medico.user_id
                    ? "medico-card--selected"
                    : ""
                }`}
              >
                <div className="avatar-container">
                  <img
                    src={medico.avatarUrl}
                    alt={`Avatar de ${medico.nome}`}
                    className="avatar-image"
                  />
                </div>
                <div className="medico-info">
                  <strong className="medico-name">{medico.nome}</strong>
                  <small>{medico.especialidade}</small>
                </div>
              </div>
            ))}
          </>
        )}

        {profissional && (
          <>
            {profissional.map((profissional: Profissional) => (
              <div
                key={profissional.user_id}
                onClick={() => handleProfissionalSelecionado(profissional)}
                className={`medico-card ${
                  medicoSelecionado === profissional.user_id
                    ? "medico-card--selected"
                    : ""
                }`}
              >
                <div className="avatar-container">
                  <img
                    src={profissional.avatar}
                    alt={`Avatar de ${profissional.nome}`}
                    className="avatar-image"
                  />
                </div>
                <div className="medico-info">
                  <strong className="medico-name">{profissional.nome}</strong>
                  <small>{profissional.especialidade.nome}</small>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <button className="button-scroll" onClick={scrollRightFunc}>
        &rarr;
      </button>
    </div>
  );
};

export default MedicosHorizontalList;
