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


import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";

interface eventInterface {
  title: string;
  start: Date;
  end: Date;
  clientName: string;
  details: string;
  clientImageUrl: string;
}

const CalendarComponent = ({ events }: any) => {
  const [modalOpen, setModalOpen] = useState(false); // Controla se a modal está aberta
  const [selectedEvent, setSelectedEvent] = useState<eventInterface | any>(
    null
  ); // Armazena o evento selecionado

  const [status, setStatus] = useState("realizado");

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };


  const handleSave = () => {
    if (selectedEvent) {
      console.log(`Salvando o status '${status}' para o evento '${selectedEvent.title}'`);
      // Aqui você pode fazer uma chamada de API para salvar o status no banco de dados
      // ou atualizar o estado global do evento se estiver usando um estado de gerenciamento como Redux ou Context API
  
      // Simulando uma atualização bem sucedida
      alert(`Status '${status}' salvo com sucesso para '${selectedEvent.title}'`);
      handleClose();  // Fechar modal após salvar
      setStatus('realizado')
    }
  };

  // Função para lidar com o clique no evento
  const handleEventClick = ({ event }: any) => {
    setSelectedEvent(event);
    setModalOpen(true); // Abre a modal
  };

  // Função para fechar a modal
  const handleClose = () => {
    setStatus('realizado')
    setModalOpen(false);
  };

  // Função para adicionar tooltip a cada evento no momento da montagem
  const handleEventDidMount = ({ event, el }: any) => {
    tippy(el, {
      content: `Title: ${event.title}<br>Start: ${event.start.toISOString()}`,
      allowHTML: true,
      theme: "light",
    });
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        events={events} // Passando os eventos para o calendário
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        locale={ptLocale} // Definir o locale para português
        eventDidMount={handleEventDidMount} // Garantir que o tooltip é aplicado a cada evento novo ou alterado
        eventClick={handleEventClick}
      />

      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle className="agenda-titele">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: "8px", top: "8px" }}
          >
            <CloseIcon />
          </IconButton>
          {selectedEvent?.title}
        </DialogTitle>
        <DialogContent className="agenda-informacao">
          <text className="text">Informação sobre agenda</text>
          <DialogContentText className="detalhes">

          <div className="container-cliente">
            <img
                key={1}
                src={selectedEvent?.extendedProps?.clientImageUrl}
                alt={selectedEvent?.extendedProps?.clientName}
                className={'avatar'}
            />
              {/* <text className="text">Cliente:</text> */}
              <text>{selectedEvent?.extendedProps.clientName}</text>
            </div>

            <div>
              <text className="text">De </text>{" "}
              {selectedEvent && selectedEvent.start.toISOString()}
              <text className="text"> ate </text>
              {selectedEvent && selectedEvent.end?.toISOString()}
            </div>


            <div>
              <text className="text">Details:</text>

              <text>{selectedEvent?.extendedProps.details}</text>
            </div>
          </DialogContentText>
          <FormControl component="fieldset">
            <FormLabel component="legend">Status do Evento</FormLabel>
            <RadioGroup
              row
              aria-label="status"
              name="row-radio-buttons-group"
              value={status}
              onChange={handleStatusChange}
            >
              <FormControlLabel
                value="realizado"
                control={<Radio />}
                label="Realizado"
              />
              <FormControlLabel
                value="cancelado"
                control={<Radio />}
                label="Cancelado"
              />
              <FormControlLabel
                value="remarcado"
                control={<Radio />}
                label="Remarcado"
              />
            </RadioGroup>
    
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button className="btn-fechar" onClick={handleClose}>fechar</Button>
          <Button className="btn-salvar" onClick={handleSave}>Salvar <FaCheckCircle /> </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CalendarComponent;
