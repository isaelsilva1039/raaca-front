import { Button, Grid, CircularProgress } from "@mui/material";

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
  return (
    <Grid
      container
      spacing={2}
      style={{
        padding: "0px 57px 0px 61px",
      }}
    >
      {load ? (
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <>
          {horariosDisponiveis.length > 0 ? (
            horariosDisponiveis.map((horario, index) => (
              <Grid item xs={3} key={index}>
                <Button
                  style={{
                    color: horarioSelecionado === horario ? "white " : "#9c27b0",
                    width: "100%",
                    background: horarioSelecionado === horario ? "#9c27b0" : "white",
                    border: horarioSelecionado === horario ? "#9c27b0 1px solid" : "#9c27b0 1px solid",
                  }}
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
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "50px",
              }}
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
