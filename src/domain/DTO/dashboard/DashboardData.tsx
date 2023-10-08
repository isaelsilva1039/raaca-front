import HorizontalWidget from "./HorizontalWidget";
import Tabela from "./Tabela";
import TotalGeral from "./TotalGeral";
import TotalTransacoesItem from "./TotalTransacoesItem";

export default interface DashboardData {
  horizontalWidgets: HorizontalWidget[];
  totalGeral: TotalGeral;
  totalTransacoes: TotalTransacoesItem[];
  tabelas: Tabela[];
}