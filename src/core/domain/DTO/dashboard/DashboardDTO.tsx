import HorizontalWidgetDTO from "./HorizontalWidgetDTO";
import TabelaDTO from "./TabelaDTO";
import TotalGeralDTO from "./TotalGeralDTO";
import TotalTransacoesItemDTO from "./TotalTransacoesItemDTO";

export default interface DashboardDTO {
  horizontalWidgets: HorizontalWidgetDTO[] | undefined;
  totalGeral: TotalGeralDTO | undefined;
  totalTransacoes: TotalTransacoesItemDTO[] | undefined;
  tabelas: TabelaDTO[] | undefined;
}