import React, { useRef } from "react";
import { Box, Button } from "@mui/material";
import { addDays, format, isBefore, startOfToday } from "date-fns";

interface Props {
  diasMes: Date[];
  diaSelecionado: Date | null;
  handleDiaClick: (dia: Date) => void;
  scrollLeft: () => void;
  scrollRight: () => void;
}

const ScrollableDates: React.FC<Props> = ({
  diasMes,
  diaSelecionado,
  handleDiaClick,
  scrollLeft,
  scrollRight,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tomorrow= startOfToday();
  
  const today = addDays(tomorrow, 1); // A partir de amanhã


  return (
    <Box mt={2} mb={2} style={{ display: "flex", alignItems: "center" }}>
      <Button onClick={scrollLeft} style={{ padding: "2px", cursor: "pointer" }}>
        &larr;
      </Button>
      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          overflowX: "hidden",
          gap: "8px",
          flex: 1,
        }}
      >
        {diasMes.map((dia, index) => {

          const isPast = isBefore(dia, today);
          return (
            <Button
              key={index}
              color="secondary"
              variant={diaSelecionado === dia ? "contained" : "outlined"}
              onClick={() => handleDiaClick(dia)}
              disabled={isPast} // Desativa o botão se a data é anterior ao dia atual
            >
              {format(dia, "dd/MM")}
            </Button>
          );
        })}
      </div>
      <Button onClick={scrollRight} style={{ padding: "8px", cursor: "pointer" }}>
        &rarr;
      </Button>
    </Box>
  );
};

export default ScrollableDates;
