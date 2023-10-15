import TabelaDashboardDTO from "@/core/domain/dto/TabelaDashboardDTO"
import HorizontalWidgetDTO from "./HorizontalWidgetDTO"
import TotalGeralDTO from "./TotalGeralDTO"
import TotalTransacoesItemDTO from "./TotalTransacoesItemDTO"

export default interface DashboardDTO {
  horizontalWidgets: HorizontalWidgetDTO[]
  totalGeral: TotalGeralDTO
  totalTransacoes: TotalTransacoesItemDTO[]
  tabelas: TabelaDashboardDTO[]
}