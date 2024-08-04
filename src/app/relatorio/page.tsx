"use client";

import React, { useEffect, useMemo, useState } from "react";
import CustomTable from "../cadastro-especialidades/customTable";
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
import axios from "axios";
import { useCliente } from "@/core/helpes/UserContext";
import MuiTableSkeleton from "@/core/infra/ports/react/componentes/skeleton/MuiTableSkeleton";
import { relatorioDeConsultasPorMedico } from "../api/relatorios/services";
import "../cadastro-especialidades/style.css";
import { styled } from "@mui/system";
import { IoIosSearch } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import RelatorioMedicoPage from "./relatorio-medico-consolidade";
import './styles.css';
import RelatoriosAgendamentos from "./relatorio-agendas";
import { FaUserDoctor } from "react-icons/fa6";
import { LuCalendarSearch } from "react-icons/lu";

const StyledButton = styled(Button)({
  backgroundColor: "rgb(167, 4, 248)",
  color: "white",
  padding: "8px 16px",
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: "8px",
  height: "54px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  "&:hover": {
    backgroundColor: "rgb(167, 4, 248)",
  },
});

const TabsRelatorios: React.FC = () => {
  const { token } = useCliente();
  const [relatorio, setRelatorio] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [tabIndex, setTabIndex] = useState(0);
  const [issTable, setIsTable] = useState(false);

  // Pega o primeiro e o último dia do mês atual
  const getDefaultDateRange = () => {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );
    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  };

  const { startDate: defaultStartDate, endDate: defaultEndDate } =
    getDefaultDateRange();
  const [startDate, setStartDate] = useState<string>(defaultStartDate);
  const [endDate, setEndDate] = useState<string>(defaultEndDate);

  useEffect(() => {
    fetchRelatorio();
  }, [token]);

  const fetchRelatorio = async () => {
    if (!token) return;
    setLoading(true);

    relatorioDeConsultasPorMedico(
      token,
      (data) => {
        console.log("Dados recebidos:", data);
        setLoading(false);
        setRelatorio(data);
      },
      (error) => {
        console.error("Erro ao obter relatório:", error);
        setLoading(false);
      },
      startDate,
      endDate
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Médico",
        accessor: "medico_nome",
      },
      {
        Header: "Realizadas",
        accessor: (row: any) => {
          const realizado = row.status.find(
            (s: any) => s.status_ajustado === "realizado"
          );
          return realizado ? realizado.quantidade_consultas : 0;
        },
      },
      {
        Header: "Não Realizadas",
        accessor: (row: any) => {
          const naoRealizado = row.status.find(
            (s: any) => s.status_ajustado === "não realizada"
          );
          return naoRealizado ? naoRealizado.quantidade_consultas : 0;
        },
      },
      {
        Header: "Pendente",
        accessor: (row: any) => {
          const pendente = row.status.find(
            (s: any) => s.status_ajustado === "pendente"
          );
          return pendente ? pendente.quantidade_consultas : 0;
        },
      },
      {
        Header: "Cancelado",
        accessor: (row: any) => {
          const pendente = row.status.find(
            (s: any) => s.status_ajustado === "cancelado"
          );
          return pendente ? pendente.quantidade_consultas : 0;
        },
      },
      {
        Header: "Total",
        accessor: (row: any) => row.total,
      },
    ],
    []
  );

  const renderRowSubComponent = () => {
    return <></>;
  };

  const handleFilter = () => {
    fetchRelatorio();
  };

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <Typography
        className="list-top"
        sx={{
          color: "#707EAE",
          fontWeight: "500",
          lineHeight: "24px",
          fontSize: "15px",
          display: "flex",
          gap: 12,
          padding:'0 0 8px 0'
        }}
      >
        Menu/Relatórios
      </Typography>
      
      <div
        style={{ padding: "20px", background: "white", borderRadius: "4px" }}
      >
        <div style={{ padding: "20 0 0 0" }}>
          
          <Tabs
            centered
            variant="scrollable"
            style={{ padding: isMobile ? "52px 0 20px 0" : "0px 0 20px 0" }}
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
            
          >
            <Tab
              style={{textTransform:'capitalize'}}
              label="Relatório por medico"
              onClick={() => setIsTable(true)}
              icon={<FaUserDoctor />}
            />
            <Tab
              style={{textTransform:'capitalize'}}
              label="Relatório agendamentos detalhados"
              onClick={() => setIsTable(true)}
              icon={<LuCalendarSearch />}
              title="Visualize um relatório detalhado dos agendamentos"
            />
        
          </Tabs>
          <hr style={{marginTop:-20}}></hr>

          {tabIndex === 0 && <RelatorioMedicoPage />}

          {tabIndex === 1 && <RelatoriosAgendamentos />}

        
        </div>
      </div>
    </>
  );
};

export default TabsRelatorios;
