"use client";
import DoctorCard from "@/core/infra/ports/react/componentes/doctor/cards-doctor";
import { Doctor } from "@/core/infra/ports/react/componentes/doctor/types";
import { Typography } from "@mui/material";
import "./styles.css";
import CalendarComponent from "@/core/infra/ports/react/componentes/calendario/CalendarComponent";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { fetchProfissionais } from "../cadastro-profissionais/ferch";
import { useCliente } from "@/core/helpes/UserContext";
import AgendamentosSkeleton from "@/core/infra/ports/react/componentes/skeleton/AgendamentosSkeleton";
import { fetchEventos, fetchEventosMedico } from "../api/horarios/eventos";
import { FaFilterCircleXmark } from "react-icons/fa6";

import { FiFilter as Filter } from "react-icons/fi";
import { getProfissnionais } from "../cadastro-profissionais/getProfissionais";


interface IData {
  id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
  user_id : number;
}

export default function Agendamentos() {
  const [profissionais, setProfissionais] = useState<any>([]);
  
  const [eventos, setEventos] = useState<any>({});

  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [idSelect , setIdSelect] = useState<null | number>(null) 
  const { token, user } = useCliente();

  const [novoEventoState, setNovoEvento] = useState(false);

  const fetchProfissionaisAll = () => {
    if(!token) return;
    setLoading(true);
    const onFetchSuccess = (data: any) => {

      setProfissionais(data?.original?.profissionais);
      console.log(data)
      setTotalItems(data?.original?.total);
      setItemsPerPage(data?.original?.perPage);
      setLoading(false);
    };

    const onFetchError = (error: any) => {
      console.error("Erro ao buscar profissionais:", error);
      setError(error);
      setLoading(false);
    };


    getProfissnionais(onFetchSuccess, onFetchError, token);
 
  };



  const onUpdate = ( ) => {
    setNovoEvento(true)
  } 

  const fetchMyEventos = () => {
    if(!token) return;

    setLoading(true);
    const onFetchSuccess = (data: any) => {
      setEventos(data?.data);
      setLoading(false);
    };

    const onFetchError = (error: any) => {
      console.error("Erro ao buscar profissionais:", error);
      setError(error);
      setLoading(false);
    };

    fetchEventos(
      onFetchSuccess,
      onFetchError,
      token
    );
  };

  useEffect(() => {
    fetchProfissionaisAll();
    fetchMyEventos()
  }, [token]);


  const fetchMyEventosFilter = () => {
    if(!token) return;

    const onFetchSuccess = (data: any) => {
      setEventos(data.data);
      setLoading(false);
    };

    const onFetchError = (error: any) => {
      console.error("Erro ao buscar profissionais:", error);
      setError(error);
      setLoading(false);
    };

    fetchEventosMedico(
      onFetchSuccess,
      onFetchError,
      token,
      idSelect
    );
  };


  useEffect(() => {
    fetchMyEventosFilter()
  }, [idSelect]);

  useEffect(() => {

    if(novoEventoState){

      if(!token) return;

      const onFetchSuccess = (data: any) => {
        setEventos(data.data);
      };
  
      const onFetchError = (error: any) => {
        console.error("Erro ao buscar profissionais:", error);
        setError(error);
        setLoading(false);
      };


      fetchEventos(
        onFetchSuccess,
        onFetchError,
        token
      );
      setNovoEvento(false)
    }
  }, [novoEventoState]);


  const onMedicoSelec = (id_user: any) => {
    setIdSelect(id_user)
  }
  

  return (
    <div className="container">
      {loading ? (
        <AgendamentosSkeleton />
      ) : (
        <>
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
            {user?.tipo == 1 && (
              <div className="menu-profissionais">
                <div className="card-lista-prof">
                  <text className="text-item">Lista de profissionais</text>
                  {idSelect ? (
                    <FaFilterCircleXmark color="#707EAE" onClick={ () => setIdSelect(null)} style={{cursor:'pointer'}}/>
                  ) : (
                    ''
                  )}
               
                </div>

                {profissionais?.map((doctor : any) => (
                  <DoctorCard doctor={doctor} onMedicoSelec={onMedicoSelec} idSelect={idSelect}/>
                ))}
              </div>
            )}
            <div className="calendario">
              <CalendarComponent events={eventos} onUpdate={onUpdate} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
