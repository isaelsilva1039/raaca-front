"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Card, Stack } from "@mui/material";
import Calendar from "@mui/icons-material/CalendarToday";
import { LineChartProps } from "@/core/ui/componentes/grafico-linha/LineChartProps";
import React from "react";
import { PeriodoTituloDescricaoIndicador } from "../periodo-titulo-descricao-indicador/PeriodoTituloDescricaoIndicador";
import PeriodoTituloDescricaoIndicadorProps from "../periodo-titulo-descricao-indicador/PeriodoTituloDescricaoIndicadorProps";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const TimelineButton = (): JSX.Element => {
  return (
    <div className="timeline-button">
      <Calendar className="calendar-today" />
      <div className="text-wrapper">Este mês</div>
    </div>
  );
};

export const GraficoLinha = (props: LineChartProps) => {
  const periodoTituloDescricaoIndicadorProps: PeriodoTituloDescricaoIndicadorProps = {
    titulo: props.valor,
    descricao: "Total geral",
    variacao: props.variacao,
  };

  return (
    <Card sx={{
      borderRadius: "8px",
      boxShadow: "none",
      height: "100%",
      paddingRight: "24px",
    }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="flex-start"
        height={"100%"}
      >
        <Box sx={{ flexGrow: 1, minWidth: "25%", pr: 3 }}>
          <PeriodoTituloDescricaoIndicador {...periodoTituloDescricaoIndicadorProps} />
        </Box>

        <Box
          sx={{
            flexGrow: 2,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            maxHeight: "340px",
          }}
        >
          <Line
            height={"100%"}
            width={"100%"}
            options={{ ...props.options, maintainAspectRatio: false }}
            data={props.data}
          />
        </Box>
      </Stack>
    </Card>
  );
};