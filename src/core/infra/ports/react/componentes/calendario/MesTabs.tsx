import { Tabs, Tab } from "@mui/material";

interface MesTabsProps {
  monthe: any[];
  mesSelecionado: number;
  handleMesChange: (mes: number) => void;
}

const MesTabs: React.FC<MesTabsProps> = ({ monthe, mesSelecionado, handleMesChange }) => {
  return (
    <Tabs
      value={mesSelecionado}
      onChange={(event, newValue) => handleMesChange(newValue)}
      variant="scrollable"
      scrollButtons="auto"
      indicatorColor="secondary"
      textColor="secondary"
    >
      {monthe.map((mes, index) => (
        <Tab key={index} label={mes.mes} value={mes.value} />
      ))}
    </Tabs>
  );
};

export default MesTabs;
