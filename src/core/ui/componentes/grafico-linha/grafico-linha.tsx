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
import { useVariationStyles } from "../../hooks/useVariationsStyles";
import { PeriodoTituloDescricaoIndicador } from "../periodo-titulo-descricao-indicador/PeriodoTituloDescricaoIndicador";

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
  const { IndicatorIcon, indicatorColor, message, MessageIcon } =
    useVariationStyles(props.variacao);

  return (
    <Card sx={{ borderRadius: "8px",  boxShadow:"none", height:"100%"}}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="flex-start"
      >
        <Box sx={{ flexGrow: 1, minWidth: "25%", pr: 3 }}>
          <PeriodoTituloDescricaoIndicador/>
        </Box>

        <Box
          sx={{
            flexGrow: 2,
            width: "100%",
            minHeight: "327px",
            overflow: "hidden",
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
