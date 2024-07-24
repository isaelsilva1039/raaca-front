import { Button, Grid, CircularProgress } from "@mui/material";
import './HorarioList.css'; // Certifique-se de que o caminho está correto

interface HorarioListProps {
  horariosDisponiveis: any[];
  horarioSelecionado: any;
  handleHorarioClick: (horario: any) => void;
  load: boolean;
}

const HorarioList: React.FC<HorarioListProps> = ({
  horariosDisponiveis,
  horarioSelecionado,
  handleHorarioClick,
  load,
}) => {


  const getButtonClass = (horario : any) => {
    return `button ${horarioSelecionado === horario ? 'buttonSelected' : 'buttonNotSelected'}`;
  };

  return (
    <Grid
      container
      spacing={2}
      className="gridContainer"
    >
      {load ? (
        <Grid
          item
          xs={12}
          className="gridItem"
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <>
          {horariosDisponiveis.length > 0 ? (
            horariosDisponiveis.map((horario, index) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={index}>

                <Button
                  className={getButtonClass(horario)}
                  onClick={() => handleHorarioClick(horario)}
                >
                  {horario.start} - {horario.end}
                </Button>
              </Grid>
            ))
          ) : (
            <Grid
              item
              xs={12}
              className="indisponivel"
            >
              Horários indisponíveis
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default HorarioList;
