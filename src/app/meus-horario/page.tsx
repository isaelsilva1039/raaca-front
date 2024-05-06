"use client";
import React, { useState, useEffect } from "react";
import { WeeklySchedule, TimeSlot } from "./types";
import {
  Tabs,
  Tab,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import ScheduleSkeleton from "@/core/infra/ports/react/componentes/skeleton/ScheduleSkeleton";
import { useCliente } from "@/core/helpes/UserContext";
import { fetchMes, fetchSchedule, saveSchedule } from "../api/horarios/horarios-api";
import MonthsList from "@/core/infra/ports/react/componentes/mes/MonthSwitch";

const defaultSchedule: WeeklySchedule = {
  segunda: [],
  terca: [],
  quarta: [],
  quinta: [],
  sexta: [],
  sabado: [],
  domingo: [],
};

const SchedulePage: React.FC = () => {
  const [schedule, setSchedule] = useState<WeeklySchedule>(defaultSchedule);
  const { token, user } = useCliente();
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [monthe, setMonthe] = useState([]);
  const [issTable, setIsTable] = useState(false);
  const [loadingMes, setLoadingMes] = useState(false);

  const loadSchedule = async () => {
    setLoading(true);
    if (!token) return;
    try {
      await fetchSchedule(
        token,
        (data) => {
          setSchedule(data.original.data[0].horarios);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
        }
      );
    } catch (error) {
      setLoading(false);
    }
  };



  const getMesAgenda = async () => {
    const ativo = false
    if (!token) return;
    setLoadingMes(true)
    try {
      await fetchMes(
        token,
        user.id,
        (data) => {
          // console.log(data.data)
          setMonthe(data.original.data);
          setLoadingMes(false)
        },
        (error) => {
          setLoadingMes(false)
        },
        ativo
      );
    } catch (error) {
   
    }
  };


  

  useEffect(() => {
    loadSchedule();
    getMesAgenda()
  }, [token ]);



  useEffect(() => {

    if(issTable){

      getMesAgenda()
      setIsTable(false);
    }
  }, [issTable]);

  


  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const handleAddTimeSlot = (day: string) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].push({ start: "08:00", end: "12:00" });
    updatedSchedule[day].push({ start: "14:00", end: "17:00" });
    setSchedule(updatedSchedule);

    handleSaveSchedule();
  };

  const handleTimeChange = (
    day: string,
    index: number,
    field: keyof TimeSlot,
    value: string
  ) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day][index][field] = value;
    setSchedule(updatedSchedule);

    handleSaveSchedule();
  };

  const handleRemoveTimeSlot = async (day: string, index: number) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].splice(index, 1);
    setSchedule(updatedSchedule);

    handleSaveSchedule();
  };

  const handleSaveSchedule = async () => {
    await saveSchedule(
      schedule,
      token,
      (data) => console.log("Saved Successfully:", data),
      (error) => console.error("Failed to Save:", error)
    );
  };


  return (
    <Box className="container-a" sx={{ p: 3 }}>
      {loading ? (
        <ScheduleSkeleton />
      ) : (
        <>
          <Tabs style={{padding: '0 0 20px 0'}} value={tabIndex}
              onChange={handleTabChange} 
              centered 
              variant="fullWidth"            
              indicatorColor="secondary"
              textColor="secondary">

            <Tab label=" Configurar horários" 
              onClick={() => setIsTable(true)}
            />
            <Tab label="Liberar agenda" onClick={() => setIsTable(true)} />

            <Tab label="Bloquear dias" onClick={() => setIsTable(true)}/>
          </Tabs>

          {tabIndex === 0 && (
            <>
              <Typography
                className="list-top"
                sx={{
                  color: "#707EAE",
                  fontWeight: "500",
                  lineHeight: "24px",
                  fontSize: "15px",
                  padding: "0 0 10px 0",
                }}
              >
                Menu / Configurar Meus Horários
              </Typography>

              {Object.keys(defaultSchedule).map((day) => (
                <Card key={day} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </Typography>
                    {schedule[day].map((slot, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          gap: 2,
                          mb: 1,
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          label="Início"
                          type="time"
                          value={slot.start}
                          onChange={(e) =>
                            handleTimeChange(day, index, "start", e.target.value)
                          }
                          sx={{ width: "130px" }}
                        />
                        <TextField
                          label="Fim"
                          type="time"
                          value={slot.end}
                          onChange={(e) =>
                            handleTimeChange(day, index, "end", e.target.value)
                          }
                          sx={{ width: "130px" }}
                        />
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemoveTimeSlot(day, index)}
                        >
                          Remover
                        </Button>
                      </Box>
                    ))}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleAddTimeSlot(day)}
                    >
                      Adicionar Horário
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
          {tabIndex === 1 && (
            <Box>
           
             <MonthsList  token={token} apiMonths={monthe} loadingMes={loadingMes}/>

            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SchedulePage;
