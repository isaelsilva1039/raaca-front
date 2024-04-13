import HorizontalWidgetDTO from "@/core/domain/dto/HorizontalWidgetDTO"
import CardLabelTituloDescricaoIconeIndicadorDTO from "../ports/react/dto/CardLabelTituloDescricaoIconeIndicadorDTO"
import { CardTituloDescricaoIconeDTO } from "../ports/react/dto/CardTituloDescricaoIconeDTO"
import PeriodoTituloDescricaoIndicadorDTO from "../ports/react/dto/PeriodoTituloDescricaoIndicadorDTO"
import { TabelaDTO } from "../ports/react/dto/TabelaDTO"
import TotalTransacoesItemDTO from "@/core/domain/dto/TotalTransacoesItemDTO"
import TabelaDashboardDTO from "@/core/domain/dto/TabelaDashboardDTO"
import TotalGeralDTO from "@/core/domain/dto/TotalGeralDTO"
import { LineChartDTO } from "../ports/react/dto/LineChartDTO" 

export default interface ReactMapper {

    toCardTituloDescricaoIconeDTO(horizontalWidgets: HorizontalWidgetDTO[]): CardTituloDescricaoIconeDTO[]

    toCardLabelTituloDescricaoIconeIndicadorDTO(totalTransacoes: TotalTransacoesItemDTO[]): CardLabelTituloDescricaoIconeIndicadorDTO[]

    toTabelaDTO(dtos: TabelaDashboardDTO[]): TabelaDTO[]

    toPeriodoTituloDescricaoIndicadorDTO(dto: TotalGeralDTO): PeriodoTituloDescricaoIndicadorDTO

    toLineChartDTO(dto: TotalGeralDTO): LineChartDTO
}