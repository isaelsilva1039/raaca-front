import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  SelectChangeEvent
} from "@mui/material";
import { FaCheck } from "react-icons/fa6";

interface Props {
  usuario: any;
  loadusuario: boolean;
  onSubmit: (hora: any, minuto: any) => void;
}

const ConfiguracaoTempoConsultas: React.FC<Props> = ({ usuario, loadusuario, onSubmit }) => {
  const [hora, setTempoConsulta] = useState<number | string>(0);
  const [minuto, setDuracaoConsulta] = useState<any>(15);

  // Função para converter minutos em horas e minutos
  const converterTempo = (minutos: number) => {

    console.log(minutos)
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return { horas, minutosRestantes };
  };

  // Usar useEffect para definir os valores iniciais
  useEffect(() => {
    if (usuario && usuario.tempo_consulta) {
      const { horas, minutosRestantes } = converterTempo(usuario?.tempo_consulta);

      console.log(horas)
      console.log(minutosRestantes)
      setTempoConsulta(horas);
      setDuracaoConsulta(minutosRestantes);
    }
  }, [usuario]);

  const handleChangeTempo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempoConsulta(event.target.value);
  };

  const handleChangeDuracao = (event: SelectChangeEvent<any>) => {
    setDuracaoConsulta(event.target.value as string);
  };

  const handleSubmit = () => {
    onSubmit(hora, minuto);
  };

  return (
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
        Configuração de Tempo de Consultas
      </Typography>

      <Grid
        style={{
          background: "white",
          padding: 22,
          borderRadius: 4,
          borderLeft: "3px solid #a704f8",
        }}
        spacing={2}
      >
        <Box>
          {loadusuario ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <>
              <Box mb={2}>
                <TextField
                  label="Hora"
                  variant="outlined"
                  fullWidth
                  value={hora}
                  onChange={handleChangeTempo}
                  type="number"
                  helperText="Insira a hora"
                />
              </Box>
              <Box mb={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="minutos-label">Minutos</InputLabel>
                  <Select
                    labelId="minutos-label"
                    value={minuto}
                    onChange={handleChangeDuracao}
                    label="Minutos"
                  >
                    <MenuItem value="0">0 minutos</MenuItem>
                    <MenuItem value="5">5 minutos</MenuItem>
                    <MenuItem value="10">10 minutos</MenuItem>
                    <MenuItem value="15">15 minutos</MenuItem>
                    <MenuItem value="20">20 minutos</MenuItem>
                    <MenuItem value="25">25 minutos</MenuItem>
                    <MenuItem value="30">30 minutos</MenuItem>
                    <MenuItem value="35">35 minutos</MenuItem>
                    <MenuItem value="45">45 minutos</MenuItem>
                    <MenuItem value="50">50 minutos</MenuItem>
                    <MenuItem value="60">60 minutos</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                textAlign="center"
                style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  style={{
                    background: "#a704f8",
                    display: "flex",
                    gap: 8,
                    alignContent: "flex-end",
                  }}
                  onClick={handleSubmit}
                >
                  Salvar Configuração <FaCheck />
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default ConfiguracaoTempoConsultas;
