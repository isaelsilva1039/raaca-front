'use client'
import React, { useState } from 'react';
import { WeeklySchedule, TimeSlot } from './types';
import { Button, Card, CardContent, Typography, TextField, Box } from '@mui/material';
import { CiTrash } from "react-icons/ci";
import { saveSchedule } from '../api/horarios/horarios-api';

import { useCliente } from "@/core/helpes/UserContext";



const defaultSchedule: WeeklySchedule = {
  segunda: [],
  terca: [],
  quarta: [],
  quinta: [],
  sexta: [],
  sabado: [],
  domingo: []
};

const SchedulePage: React.FC = () => {
  const [schedule, setSchedule] = useState<WeeklySchedule>(defaultSchedule);
  const {token} = useCliente();
 
    const handleAddTimeSlot = (day: string) => {
        const updatedSchedule = { ...schedule };
        updatedSchedule[day].push({ start: '08:00', end: '17:00' });
        setSchedule(updatedSchedule);
      };
    
      const handleTimeChange = (day: string, index: number, field: keyof TimeSlot, value: string) => {
        const updatedSchedule = { ...schedule };
        updatedSchedule[day][index][field] = value;
        setSchedule(updatedSchedule);

        handleSaveSchedule()
      };
    
      const handleRemoveTimeSlot = async (day: string, index: number) => {
        // await removeTimeSlot(day, index, schedule);
        const updatedSchedule = { ...schedule };
        updatedSchedule[day].splice(index, 1);
        setSchedule(updatedSchedule);
      };
    

      const handleSaveSchedule = async () => {
        await saveSchedule(
            schedule,
            token,
            data => console.log("Saved Successfully:", data),
            error => console.error("Failed to Save:", error)
        );
      };

  return (
    <Box className="container" sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Configurar Meus Horários
      </Typography>
      {Object.keys(defaultSchedule).map(day => (
        <Card key={day} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{day.charAt(0).toUpperCase() + day.slice(1)}</Typography>
            {schedule[day].map((slot, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1, alignItems: 'center' }}>
                <TextField
                  label="Início"
                  type="time"
                  value={slot.start}
                  onChange={(e) => handleTimeChange(day, index, 'start', e.target.value)}
                  sx={{ width: '130px' }}
                />
                <TextField
                  label="Fim"
                  type="time"
                  value={slot.end}
                  onChange={(e) => handleTimeChange(day, index, 'end', e.target.value)}
                  sx={{ width: '130px' }}
                />
                <Button variant="outlined" color="error" onClick={() => handleRemoveTimeSlot(day, index)}>
                    Remover 
                </Button>
              </Box>
            ))}
            <Button variant="outlined" color='secondary' onClick={() => handleAddTimeSlot(day)}>
                Adicionar Horário
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default SchedulePage;
