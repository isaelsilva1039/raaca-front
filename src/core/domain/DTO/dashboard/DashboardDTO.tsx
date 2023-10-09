import HorizontalWidgetDTO from "./HorizontalWidgetDTO";
import TabelaDTO from "./TabelaDTO";
import TotalGeralDTO from "./TotalGeralDTO";
import TotalTransacoesItemDTO from "./TotalTransacoesItemDTO";

export default interface DashboardDTO {
  horizontalWidgets: HorizontalWidgetDTO[];
  totalGeral: TotalGeralDTO;
  totalTransacoes: TotalTransacoesItemDTO[];
  tabelas: TabelaDTO[];
}