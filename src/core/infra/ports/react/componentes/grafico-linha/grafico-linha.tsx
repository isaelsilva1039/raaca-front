"use client"

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
import { Line } from "react-chartjs-2"
import { Box, Card, Stack } from "@mui/material"

import React from "react"
import PeriodoTituloDescricaoIndicadorDTO from "../../dto/PeriodoTituloDescricaoIndicadorDTO"
import { PeriodoTituloDescricaoIndicador } from "../periodo-titulo-descricao-indicador/PeriodoTituloDescricaoIndicador"
import { styleBoxGrafico, styleBoxPeriodo, styleCard } from "./style"
import { LineChartDTO } from "../../dto/LineChartDTO"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const GraficoLinha = (props: {
  totalGeralDTO: PeriodoTituloDescricaoIndicadorDTO;
  lineChartDTO: LineChartDTO;
}) => {
  return (
    <Card sx={styleCard}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="flex-start"
        height={"100%"}
      >
        <Box sx={styleBoxPeriodo}>
          <PeriodoTituloDescricaoIndicador dto={props.totalGeralDTO} />
        </Box>

        <Box
          sx={styleBoxGrafico}
        >
          <Line
            height={"100%"}
            width={"100%"}
            options={{ ...props.lineChartDTO.options, maintainAspectRatio: false }}
            data={props.lineChartDTO.data}
          />
        </Box>
      </Stack>
    </Card>
  )
}