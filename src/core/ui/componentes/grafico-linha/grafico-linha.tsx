'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Card, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { LineChartProps } from "@/core/ui/styles/grafico-linha/LineChartProps";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const GraficoLinha = (props: LineChartProps) => {
    return (
        <Card sx={{ borderRadius: '8px' }}>
            <Stack direction="row">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-top',
                    justifyContent: 'flex-top'
                }}>
                    {props.valor ? (
                        <>
                            <Typography
                                color="#2B3674"
                                style={{
                                    fontSize: "34px",
                                    fontFamily: "DM Sans",
                                    fontWeight: "700",
                                    lineHeight: "42px",
                                    letterSpacing: "-2%",
                                }}
                            >
                                {props.valor}
                            </Typography>
                            <Box sx={{ display: "flex", mt: '10px' }}>
                                <Typography
                                    sx={{
                                        fontFamily: "DM Sans",
                                        fontWeight: "500",
                                        fontSize: "14px",
                                        lineHeight: "24px",
                                        letterSpacing: "-2%",
                                        color: "#A3AED0",
                                    }}
                                >
                                    Total geral
                                </Typography>
                                <ArrowDropUpIcon fontSize={"small"} color={"success"} sx={{ mr: "5px" }} />
                                <Typography
                                    sx={{
                                        fontFamily: "DM Sans",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        lineHeight: "28px",
                                        letterSpacing: "-2%",
                                        color: "#05CD99",
                                    }}
                                >
                                    2.78
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: 'center', mt: '10px' }}>
                                <CheckCircleIcon fontSize={"small"} color={"success"} sx={{ mr: "5px" }} />
                                <Typography
                                    sx={{
                                        fontFamily: "DM Sans",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        lineHeight: "28px",
                                        letterSpacing: "-2%",
                                        color: "#05CD99",
                                    }}
                                >
                                    Parabéns
                                </Typography>
                            </Box>
                        </>
                    ) : null}
                </Box>
                <Box
                    sx={{ flex: 1 }}
                    height={315}>
                    <Line
                        height={'auto'}
                        width={'auto'}
                        options={props.options}
                        data={props.data} />
                </Box>
            </Stack>
        </Card >
    );
};