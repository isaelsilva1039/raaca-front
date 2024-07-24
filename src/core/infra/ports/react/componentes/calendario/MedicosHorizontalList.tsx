import React, { useState, useRef, useEffect } from "react";
import "./MedicosHorizontalList.css";

interface Medico {
  user_id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
  fk_especialidade: any;
}

interface Props {
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
  // medicos,
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
          (profissional.length - 1); // Ajuste conforme necessário
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
  }, [profissional.length]);

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
    <div className="medicos-horizontal-list">
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="scroll-container"
      >
        {profissional && profissional.length > 0 && profissional.map((prof: Profissional) => (
              <div
                key={prof?.user_id}
                onClick={() => handleProfissionalSelecionado(prof)}
                className={`medico-card ${
                  medicoSelecionado === prof?.user_id
                    ? "medico-card--selected"
                    : ""
                }`}
              >
                <div className="avatar-container">
                  <img
                    src={prof?.avatar}
                    alt={`Avatar de ${prof?.nome}`}
                    className="avatar-image"
                  />
                </div>
                <div className="medico-info">
                  <strong className="medico-name">{prof?.nome}</strong>
                  <small>{prof?.especialidade?.nome}</small>
                </div>
              </div>
            ))
          }
      </div>
      {/* <div className="scroll-indicators">
        {profissional.map((prof, index) => (
          <span
            key={index}
            className={`indicator ${
              scrollPosition === index ? "active" : ""
            }`}
          ></span>
        ))}
      </div> */}
    </div>
  );
};

export default MedicosHorizontalList;
