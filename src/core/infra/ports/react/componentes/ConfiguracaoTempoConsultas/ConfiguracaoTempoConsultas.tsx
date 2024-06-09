import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { FaCheck } from "react-icons/fa6";

const ConfiguracaoTempoConsultas: React.FC = () => {
  const [tempoConsulta, setTempoConsulta] = useState<number | string>(0);
  const [duracaoConsulta, setDuracaoConsulta] = useState<any>(15);

  const handleChangeTempo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempoConsulta(event.target.value);
  };

  const handleChangeDuracao = (event: React.ChangeEvent<{ value: any }>) => {
    setDuracaoConsulta(event.target.value as string);
  };

  const handleSubmit = () => {
    

    const tempo = tempoConsulta + ":"  + duracaoConsulta;

    console.log('Configuração salva:', { tempoConsulta, duracaoConsulta });
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
    

    <Grid style={{background:'white', padding:22, borderRadius:4 , borderLeft:'3px solid #a704f8'}}  spacing={2}>
    <Box>
    
      <Box mb={2}>
        <TextField
          label="Hora"
          variant="outlined"
          fullWidth
          value={tempoConsulta}
          onChange={handleChangeTempo}
          type="number"
          helperText="Insira o tempo de consulta em minutos"
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="minutos-label">Minutos</InputLabel>
          <Select
            labelId="minutos-label"
            value={duracaoConsulta}
            onChange={() => handleChangeDuracao}
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
            <MenuItem value="55">50 minutos</MenuItem>
            <MenuItem value="60">60 minutos</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box textAlign="center" style={{ display:'flex' , gap:8 , justifyContent:'flex-end'}}>
        <Button variant="contained" style={{background: '#a704f8', display:'flex' , gap:8 , alignContent:'flex-end'}} onClick={handleSubmit}>
          Salvar Configuração <FaCheck />
        </Button>
      </Box>
    </Box>
    </Grid>
    </>
  );
  
};

export default ConfiguracaoTempoConsultas;
