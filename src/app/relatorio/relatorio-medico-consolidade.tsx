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
import { SiMicrosoftexcel } from "react-icons/si";
import { API } from "@/core/api/api";

// Estilizando o botão
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

const RelatorioMedicoPage: React.FC = () => {
  const { token } = useCliente();
  const [relatorio, setRelatorio] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>(
    {}
  );

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

  const handleDownloadXlsx = () => {
    const url =
      API +
      `/api/relatorios/exportar-relatorio-medicos?start_date=${startDate}&end_date=${endDate}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div
        style={{ padding: "20px", background: "white", borderRadius: "4px" }}
      >
        <div style={{ padding: "20 0 0 0" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <MuiTableSkeleton />
            </div>
          ) : relatorio && relatorio.length > 0 ? (
            <>
              <div
                className="filter-section"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  label="Data de Início"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  style={{ marginRight: 10 }}
                />
                <TextField
                  label="Data de Fim"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  style={{ marginRight: 10 }}
                />
                <StyledButton onClick={handleFilter}>
                  Filtrar <IoIosSearch size={18} />
                </StyledButton>
              </div>
              <div 
                style={{   display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "4px",
                  padding: "10px",
                  color: "rgb(66 138 28)",
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
              >
                <text
                  onClick={handleDownloadXlsx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "4px",
                    padding: "10px",
                    color: "rgb(66 138 28)",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  <SiMicrosoftexcel color="rgb(66 138 28)" /> Exportar xlsx{" "}
                </text>
              </div>

              <CustomTable
                columns={columns}
                data={relatorio}
                expandedRows={expandedRows}
                toggleRowExpanded={() => {}}
                renderRowSubComponent={renderRowSubComponent}
              />
            </>
          ) : (
            <Typography variant="subtitle2">
              Não há dados disponíveis para o período selecionado.
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default RelatorioMedicoPage;
