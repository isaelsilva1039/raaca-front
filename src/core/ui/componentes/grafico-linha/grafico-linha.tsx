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
import { Box, Card, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ErrorIcon from "@mui/icons-material/Error";
import Calendar from "@mui/icons-material/CalendarToday";
import { LineChartProps } from "@/core/ui/componentes/grafico-linha/LineChartProps";
import React from "react";
import "./style.css";
import { useVariationStyles } from "../../hooks/useVariationsStyles";

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

// ... (restante do código)

export const GraficoLinha = (props: LineChartProps) => {
    const { IndicatorIcon, indicatorColor, message, MessageIcon } =
      useVariationStyles(props.variacao);
  
    return (
      <Card sx={{ borderRadius: "8px", p: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
        >
          <Box sx={{ flexGrow: 1, minWidth: "25%", pr: 3 }}>
            <TimelineButton />
            <Typography
              color="#2B3674"
              sx={{
                  fontSize: { xs: "12px", sm: "13px", md: "34px" },
                  fontWeight: "700",
                lineHeight: "42px",
                letterSpacing: "-2%",
                mt: 3,
              }}
            >
              {props.valor}
            </Typography>
  
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              <Typography
                sx={{
                  fontWeight: "500",
                  lineHeight: "24px",
                  letterSpacing: "-2%",
                  color: "#A3AED0",
                  fontSize: { xs: "12px", sm: "13px", md: "14px" },
                  mr: 2,
                  whiteSpace: "nowrap"
                }}
              >
                Total geral
              </Typography>
              <IndicatorIcon
                fontSize={"small"}
                sx={{ color: indicatorColor, mr: 1 }}
              />
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                  lineHeight: "28px",
                  letterSpacing: "-2%",
                  color: indicatorColor,
                }}
              >
                {props.variacao}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <MessageIcon
                fontSize={"small"}
                color={"success"}
                sx={{ mr: 1, color: indicatorColor }}
              />
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                  lineHeight: "28px",
                  letterSpacing: "-2%",
                  color: indicatorColor,
                }}
              >
                {message}
              </Typography>
            </Box>
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
  