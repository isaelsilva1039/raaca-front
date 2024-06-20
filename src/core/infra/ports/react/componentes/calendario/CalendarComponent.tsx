// components/CalendarComponent.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"; // para interações como seleção de dia
import ptLocale from "@fullcalendar/core/locales/pt"; // Importar o locale português
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "./styles.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { FaCheckCircle } from "react-icons/fa";
import { addMinutes, differenceInHours, format } from "date-fns";
import { TbAlertCircleFilled } from "react-icons/tb";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import NovoAgendamentoModal from "./NovoAgendamentoModal";
import { getProfissnionais } from "@/app/cadastro-profissionais/getProfissionais";
import { useCliente } from "@/core/helpes/UserContext";
import EventModal from "./EventModal";

interface eventInterface {
  title: string;
  start: Date;
  end: Date;
  clientName: string;
  details: string;
  clientImageUrl: string;
}

interface Event {
  medico: {
    name: string;
    email: string;
    avatar: any;
    professional:{
      link_sala: any;
    }
  };
  cliente: {
    name: string;
    email: string;
    avatar: any;
  };
  start_time: string;
  end_time: string;
  status: string;
  cliente_id: number;
  medico_id: number;
  created_at: any;
  id: number;

}

interface TransformedEvent {
  title: string;
  start: Date;
  color: string;
  end: Date;
  extendedProps: {
    clientName: string;
    clientEmail: string;
    medicoName: string;
    medicoEmail: string;
    details: string;
    clientId: number;
    medicoId: number;
    medico_avatar: any;
    cliente_avatar: any;
    created_at: any;
    id_evento: number;
    link_sala: any;
  };
}

interface IData {
  id: number;
  nome: string;
  especialidade: string;
  avatarUrl: string;
  user_id: number;

}


const CalendarComponent = ({ events, onUpdate, isAtingido,isPrazoPassado, quantidadeConsultasPendente, quantideDeConsultasQuePodeRealizar }: any) => {
  const [modalOpen, setModalOpen] = useState(false); // Controla se a modal está aberta
  const [selectedEvent, setSelectedEvent] = useState<eventInterface | any>(
    null
  ); // Armazena o evento selecionado


  const [status, setStatus] = useState("realizado");
  const [eventos, setEvents] = useState<TransformedEvent[]>([]); // Use o tipo definido
  const [modalOpenNovo, setModalOpenNovo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profissionais, setProfissionais] = useState<IData[]>([]);

  const { token, user } = useCliente();
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  console.log(eventos)

  // Função para determinar a cor com base no status
  const getColorBasedOnStatus = (status: string): string => {
    switch (status) {
      case "pendente":
        return "#a704f8"; // Vermelho para pendentes
      case "confirmado":
        return "green"; // Verde para confirmados
      case "cancelado":
        return "red"; // Cinza para cancelados
      case "realizado":
        return "green"; // Cinza para cancelados
      default:
        return "blue"; // Um padrão, talvez azul
    }
  };

  useEffect(() => {
    
    const transformedEvents: TransformedEvent[] = Array.isArray(events)
      ? events.map((event: Event) => ({

          title: `Consulta com ${user.tipo == 1 || user.tipo == 3 ? event.medico.name : event.cliente.name}`,
          start: new Date(event.start_time),
          color: getColorBasedOnStatus(event.status),
          end: new Date(event.end_time),
          extendedProps: {
            id_evento: event.id,
            clientName: event.cliente.name,
            clientEmail: event.cliente.email,
            medicoName: event.medico.name,
            medicoEmail: event.medico.email,
            details: event.status,
            clientId: event.cliente_id,
            medicoId: event.medico_id,
            medico_avatar: event.medico.avatar,
            cliente_avatar: event.cliente.avatar,
            created_at: event.created_at,
            link_sala: event.medico?.professional?.link_sala
          },
        }))
      : [];

    setEvents(transformedEvents);
  }, [events]);



  const getProfissnionaisAll = () => {
    setLoading(true);
    const onFetchSuccess = (data: any) => {
      setProfissionais(data.original.profissionais);
      setLoading(false);
    };

    const onFetchError = (error: any) => {
      console.error("Erro ao buscar profissionais:", error);

      setLoading(false);
    };

    getProfissnionais(onFetchSuccess, onFetchError, token);
  };

  useEffect(() => {
    getProfissnionaisAll();
  }, [token]);

  const handleSave = () => {
    if (selectedEvent) {
      console.log(
        `Salvando o status '${status}' para o evento '${selectedEvent.title}'`
      );
      // Aqui você pode fazer uma chamada de API para salvar o status no banco de dados
      // ou atualizar o estado global do evento se estiver usando um estado de gerenciamento como Redux ou Context API

      // Simulando uma atualização bem sucedida
      alert(
        `Status '${status}' salvo com sucesso para '${selectedEvent.title}'`
      );
      handleClose(); 
      setStatus("realizado");
    }
  };


  const handleEventClick = ({ event }: any) => {

    console.log('event' , event)
    setSelectedEvent(event);
    setModalOpen(true); // Abre a modal
  };


  const handleClose = () => {
    setStatus("realizado");
    setModalOpen(false);
    setModalOpenNovo(false);
  };

  const handleEventDidMount = ({ event, el }: any) => {
    const formattedStart = format(new Date(event.start), "dd/MM/yyyy HH:mm:ss");
    tippy(el, {
      content: `${event.title}<br>Start: ${formattedStart}`,
      allowHTML: true,
      theme: "light",
    });
  };


  const handleNewAppointmentClick = () => {
    setModalOpenNovo(true);
  };

  const now = new Date();
  const createdAt = new Date(selectedEvent?.extendedProps.created_at);
  const hoursDiff = differenceInHours(now, createdAt);

  const isUserTypeThree = user.tipo == 3;
  const canShowOptionsForTypeThree = isUserTypeThree && hoursDiff <= 24;
  const canShowAllOptions = !isUserTypeThree;

  let podeAgendarConsultas = true;
  if(user.tipo == 3) {
     podeAgendarConsultas = quantidadeConsultasPendente < quantideDeConsultasQuePodeRealizar
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "newAppointmentButton dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        customButtons={{
          newAppointmentButton: {
            text: " + Novo",
            click: handleNewAppointmentClick,
          },
        }}
        events={eventos}
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        locale={ptLocale}
        eventDidMount={handleEventDidMount}
        eventClick={handleEventClick}
        aspectRatio={1.35}
        dateClick={() => setModalOpenNovo(true)}
        views={{
          dayGridMonth: {
            // Mês
            titleFormat: { month: "long", year: "numeric" },
          },
          timeGridWeek: {
            // Semana
            titleFormat: { month: "short", day: "numeric" },
          },
          timeGridDay: {
            // Dia
            titleFormat: { month: "long", day: "numeric" },
          },
        }}
      />

      <EventModal
        open={modalOpen}
        handleClose={handleClose}
        selectedEvent={selectedEvent}
        status={status}
        canShowOptionsForTypeThree={canShowOptionsForTypeThree}
        canShowAllOptions={canShowAllOptions}
        handleSave={handleSave}
        medicos={profissionais}
        onUpdate={onUpdate}
      />

      <NovoAgendamentoModal
        open={modalOpenNovo}
        handleClose={handleClose}
        medicos={profissionais}
        onUpdate={onUpdate}
        loading={loading}
        podeAgendarConsultas={podeAgendarConsultas}
      />
    </>
  );
};

export default CalendarComponent;
