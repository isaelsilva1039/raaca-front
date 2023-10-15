import UIPort from "@/core/application/ports/UIPort"
import PageFactory from "../ports/react/factory/PageFactory"
import ReactMapper from "./mappers/ReactMapper"
import DashboardDTO from "@/core/domain/dto/DashboardDTO"

export default class ReactAdapter implements UIPort {
    constructor(
        private readonly pageFactory: PageFactory,
        private readonly reactMapper: ReactMapper
    ) { }

    renderDashboard(dashboardInfo: DashboardDTO): JSX.Element {
        return this.pageFactory.renderDashboard(
            this.reactMapper.toCardTituloDescricaoIconeDTO(dashboardInfo.horizontalWidgets),
            this.reactMapper.toCardLabelTituloDescricaoIconeIndicadorDTO(dashboardInfo.totalTransacoes),
            this.reactMapper.toTabelaDTO(dashboardInfo.tabelas),
            this.reactMapper.toPeriodoTituloDescricaoIndicadorDTO(dashboardInfo.totalGeral),
            this.reactMapper.toLineChartDTO(dashboardInfo.totalGeral)
        )
    }
}