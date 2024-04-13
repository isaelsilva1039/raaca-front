import UIPort from "@/core/application/ports/UIPort"
import LayoutFactory from "../ports/react/factory/LayoutFactory"
import ReactMapper from "../mappers/ReactMapper"
import DashboardDTO from "@/core/domain/dto/DashboardDTO"

export default class ReactAdapter implements UIPort {
    constructor(
        private readonly pageFactory: LayoutFactory,
        private readonly reactMapper: ReactMapper
    ) { }

    renderDashboard(dashboardInfo: DashboardDTO): JSX.Element {
        return this.pageFactory.renderDashboard(
            this.reactMapper.toCardTituloDescricaoIconeDTO(dashboardInfo.horizontalWidgets),
            // this.reactMapper.toCardLabelTituloDescricaoIconeIndicadorDTO(dashboardInfo.totalTransacoes),
            // this.reactMapper.toTabelaDTO(dashboardInfo.tabelas),
            // this.reactMapper.toPeriodoTituloDescricaoIndicadorDTO(dashboardInfo.totalGeral),
            // this.reactMapper.toLineChartDTO(dashboardInfo.totalGeral)
        )
    }
}