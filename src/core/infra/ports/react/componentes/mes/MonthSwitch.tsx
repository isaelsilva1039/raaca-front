import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  Grid,
} from "@mui/material";
import { useCliente } from "@/core/helpes/UserContext";

// Lista de meses com valores numéricos
const months = [
  { name: "Janeiro", value: 0 },
  { name: "Fevereiro", value: 1 },
  { name: "Março", value: 2 },
  { name: "Abril", value: 3 },
  { name: "Maio", value: 4 },
  { name: "Junho", value: 5 },
  { name: "Julho", value: 6 },
  { name: "Agosto", value: 7 },
  { name: "Setembro", value: 8 },
  { name: "Outubro", value: 9 },
  { name: "Novembro", value: 10 },
  { name: "Dezembro", value: 11 },
];

interface MonthSwitchProps {
  name: string;
  value: number;
  isActive: boolean;
  toggleMonth: (value: number, mes: any) => void;
}

// Componente para cada item com switch
const MonthSwitch: React.FC<MonthSwitchProps> = ({
  name,
  value,
  isActive,
  toggleMonth,
}) => {

  

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{name}</Typography>
        <Switch checked={isActive} onChange={() => toggleMonth(value , name)} />
      </CardContent>
    </Card>
  );
};



// Função simulando chamada à API
const sendMonthToggleToAPI = async (value: number, isActive: boolean, mes : any , token: any) => {
  try {
    const response = await fetch("/api/months/toggle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify({ value, isActive , mes }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to toggle month:", error);
  }
};

// Componente principal que lista os meses
const MonthsList: React.FC = ({token} : any) => {


  const [activeMonths, setActiveMonths] = useState<number[]>([]);

  // Alterna o estado ativo/inativo de um mês usando seu valor numérico
  const toggleMonth = (value: number , mes: any) => {
    const isActive = !activeMonths.includes(value);
    setActiveMonths((prev) =>
      isActive ? [...prev, value] : prev.filter((v) => v !== value)
    );

    // Chama a API para alternar o status do mês
    sendMonthToggleToAPI(value, isActive, mes , token);
  };

  return (
    <Box sx={{ p: 3 }}>
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
        Menu / Controle dos Mês
      </Typography>

      <Grid container spacing={2}>
        {months.map((month) => (
          <Grid item xs={12} sm={6} md={4} key={month.value}>
            <MonthSwitch
              name={month.name}
              value={month.value}
              isActive={activeMonths.includes(month.value)}
              toggleMonth={toggleMonth}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MonthsList;
