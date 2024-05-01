'use client'
import DoctorCard from "@/core/infra/ports/react/componentes/doctor/cards-doctor";
import { Doctor } from "@/core/infra/ports/react/componentes/doctor/types";
import { Typography } from "@mui/material";
import './styles.css'
import CalendarComponent from "@/core/infra/ports/react/componentes/calendario/CalendarComponent";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { fetchProfissionais } from "../cadastro-profissionais/ferch";
import { useCliente } from "@/core/helpes/UserContext";

interface IData {
  id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
}

export default function Agendamentos() {


  const [profissionais, setProfissionais] = useState<IData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { token } = useCliente();

  const fetchProfissionaisAll = () => {
    setLoading(true);
    const onFetchSuccess = (data: any) => {
      setProfissionais(data.original.data);
      setTotalItems(data.original.total);
      setItemsPerPage(data.original.perPage);

      setLoading(false);
    };

    const onFetchError = (error: any) => {
      console.error("Erro ao buscar profissionais:", error);
      setError(error);
      setLoading(false);
    };

       
    fetchProfissionais(searchTerm ,currentPage, onFetchSuccess, onFetchError , token);
  }


  useEffect(() => {
    fetchProfissionaisAll();
  }, []);
  
  const testEvents = [
    {
        title: 'Consulta Médica',
        start: '2024-05-11T14:00:00',  // Data e hora de início do evento
        end: '2024-05-12T15:00:00',    // Data e hora de término do evento
        color: 'blue',                 // Cor opcional para o evento
        description: 'Consulta médica com o Dr. Silva',
        extendedProps: {
          details: 'Detalhes adicionais aqui',
          clientId: '123',  // Identificador único do cliente
          clientName: 'João Silva',
          clientImageUrl: 'https://randomuser.me/api/portraits/men/91.jpg'  // Nome do cliente
        }
    },
    {
        title: 'Reunião de equipe',
        start: '2024-05-11T09:00:00',
        color: 'red',
        description: 'Consulta médica com o Dr. Silva',
        extendedProps: {
          details: 'Detalhes adicionais aqui',
          clientId: '123',  // Identificador único do cliente
          clientName: 'João Silva',  // Nome do cliente
          clientImageUrl: 'https://randomuser.me/api/portraits/men/91.jpg'
        }
    }
    // Você pode adicionar mais eventos aqui conforme necessário
];



  return (
    <div className="container">

      <Typography
        className="list-top"
        sx={{
          color: "#707EAE",
          fontWeight: "500",
          lineHeight: "24px",
          fontSize: "15px",
        }}
      >
        Menu / Agendamentos
      </Typography>

      <div className="container-page">
      
        <div className="menu-profissionais">
        <div className="card-lista-prof">
          <text className="text-item">
            Lista de profissionais
          </text>
        
        </div>
          {profissionais.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
        <div className="calendario">
           <CalendarComponent events={testEvents}/>

        </div>
      </div>
    </div>
  );
}
