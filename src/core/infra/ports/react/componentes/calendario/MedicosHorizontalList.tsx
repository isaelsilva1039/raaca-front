import React, { useState, useRef, useEffect } from "react";
import "./MedicosHorizontalList.css";

interface Medico {
  user_id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
}

interface Props {
  medicos: Medico[];
  medicoSelecionado: number | string;
  setMedicoSelecionado: (value: number | string) => void;
  profissional: any;
  setEspecialidadeProfissional: any;
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const maxScrollLeft =
          scrollContainerRef.current.scrollWidth -
          scrollContainerRef.current.clientWidth;
        const currentScrollLeft = scrollContainerRef.current.scrollLeft;
        const position =
          (currentScrollLeft / maxScrollLeft) *
          (medicos.length - 1); // Ajuste conforme necessário
        setScrollPosition(Math.round(position));
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [medicos.length]);

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

  const handleProfissionalSelecionado = (profissional: any) => {
    setMedicoSelecionado(profissional.user_id);
    setEspecialidadeProfissional(profissional.especialidade.id);
  };

  return (
    <div className="medicos-horizontal-list">
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="scroll-container"
      >
        {profissional && profissional.length > 0
          ? profissional.map((prof: Profissional) => (
              <div
                key={prof.user_id}
                onClick={() => handleProfissionalSelecionado(prof)}
                className={`medico-card ${
                  medicoSelecionado === prof.user_id
                    ? "medico-card--selected"
                    : ""
                }`}
              >
                <div className="avatar-container">
                  <img
                    src={prof.avatar}
                    alt={`Avatar de ${prof.nome}`}
                    className="avatar-image"
                  />
                </div>
                <div className="medico-info">
                  <strong className="medico-name">{prof.nome}</strong>
                  <small>{prof.especialidade.nome}</small>
                </div>
              </div>
            ))
          : medicos.map((medico) => (
              <div
                key={medico.user_id}
                onClick={() => setMedicoSelecionado(medico.user_id)}
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
      </div>
      <div className="scroll-indicators">
        {medicos.map((_, index) => (
          <span
            key={index}
            className={`indicator ${
              scrollPosition === index ? "active" : ""
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default MedicosHorizontalList;
