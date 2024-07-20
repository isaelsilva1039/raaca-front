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
import {
  fetchMes,
  fetchSchedule,
  postTempoConsultas,
  saveSchedule,
} from "../api/horarios/horarios-api";
import MonthsList from "@/core/infra/ports/react/componentes/mes/MonthSwitch";
import "./styles.css";
import ConfiguracaoTempoConsultas from "@/core/infra/ports/react/componentes/ConfiguracaoTempoConsultas/ConfiguracaoTempoConsultas";
import { useMediaQuery } from "react-responsive";
import { getVerificarAgendasLiberadas } from "../api/horarios/getVerificarAgendasLiberadas";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [usuario, setUsuario] = useState<any>();
  const [salvede, setSalvede] = useState<any>();
  const [loadusuario, setLoadusuario] = useState<boolean>(false);


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
    const ativo = false;
    if (!token) return;
    setLoadingMes(true);
    try {
      await fetchMes(
        token,
        user.id,
        (data) => {
          setMonthe(data.original.data);
          setLoadingMes(false);
        },
        (error) => {
          setLoadingMes(false);
        },
        ativo
      );
    } catch (error) {}
  };

  const getMe = () => {
    if (!token) return;
    setLoadusuario(true);
    const onFetchSuccess = (data: any) => {
      setUsuario(data?.user);
      setLoadusuario(false);
    };

    const onFetchError = (error: any) => {
      setLoadusuario(false);
    };
    getVerificarAgendasLiberadas(token, onFetchSuccess, onFetchError);
    setLoadusuario(false);
  };

  useEffect(() => {
    loadSchedule();
    getMesAgenda();
  }, [token]);

  useEffect(() => {
    getMe();
  }, [token]);

  useEffect(() => {
    if (issTable) {
      getMesAgenda();
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
      (data) => {
        pushNotify("success", "Success", "Configuração salva!");
      },
      (error) => {
        pushNotify("error", "Error", "Aconteceu um erro!");
      }
    );
  };

  const pushNotify = (
    status: "success" | "error" | "info",
    title: string,
    text: string
  ) => {
    toast[status](text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: status,
      className: "notify-custom-margin", // Adiciona a classe CSS personalizada
    });
  };

  const handleConfigSubmit = (hora: any, minuto: any) => {
    if (!token) return;
    pushNotify("info", "Info", "Estamos salvando suas configuração");
    postTempoConsultas(
      hora,
      minuto,
      token,
      (data) => {
        pushNotify("success", "Success", "Configuração salva!");
      },
      (error) => {
        pushNotify("error", "Error", "Aconteceu um erro!");
      }
    );
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Box className="container-horarios" sx={{ p: 3 }}>
      <ToastContainer />
      {loading ? (
        <ScheduleSkeleton />
      ) : (
        <>
          <Tabs
            style={{ padding: isMobile ? "52px 0 20px 0" : "0px 0 20px 0" }}
            value={tabIndex}
            onChange={handleTabChange}
            centered
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab
              className="custom-tab"
              label=" Configurar horários"
              onClick={() => setIsTable(true)}
            />
            <Tab
              className="custom-tab"
              label="Liberar agenda"
              onClick={() => setIsTable(true)}
            />

            <Tab
              className="custom-tab"
              label="Tempo de consultas"
              onClick={() => setIsTable(true)}
            />

            <Tab
              className="custom-tab"
              label="Bloquear dias"
              onClick={() => setIsTable(true)}
            />
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
                            handleTimeChange(
                              day,
                              index,
                              "start",
                              e.target.value
                            )
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
              <MonthsList
                token={token}
                apiMonths={monthe}
                loadingMes={loadingMes}
              />
            </Box>
          )}

          {tabIndex === 2 && user.tipo == 1 && (
            <Box>
              <ConfiguracaoTempoConsultas
                usuario={usuario}
                loadusuario={loadusuario}
                onSubmit={handleConfigSubmit}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SchedulePage;
