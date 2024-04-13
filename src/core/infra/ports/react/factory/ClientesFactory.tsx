import PeriodoTituloDescricaoIndicadorDTO from "../dto/PeriodoTituloDescricaoIndicadorDTO"
import { CardTituloDescricaoIconeDTO } from "../dto/CardTituloDescricaoIconeDTO"
import CardLabelTituloDescricaoIconeIndicadorDTO from "../dto/CardLabelTituloDescricaoIconeIndicadorDTO"
import { TabelaDTO } from "../dto/TabelaDTO"
import { LineChartDTO } from "../dto/LineChartDTO"

import { DashboardLayout } from "../layouts/DashboardLayout"
import ComponentFactory from "./ComponentFactory"
import PropsDTO from "../dto/PropsDTO"
import { ClientesLayout } from "../layouts/ClientesLayout"

export default class ClientesFactory {
    constructor(private readonly componentFactory: ComponentFactory) { }

    renderClientes(
        // topCardsDTOs: CardTituloDescricaoIconeDTO[],
        // leftCardDTOs: CardLabelTituloDescricaoIconeIndicadorDTO[],
        tabelaDTOs: TabelaDTO[],
        // totalGeralDTO: PeriodoTituloDescricaoIndicadorDTO,
        // lineChartDTO: LineChartDTO
    ): JSX.Element {
        const propsCardsTop: PropsDTO = { xs: 12, sm: 6, md: 6, lg: 3 }
        const propsCardsLeft: PropsDTO = { xs: 12, sm: 12, md: 12, lg: 12 }
        const propsTabela: PropsDTO = { xs: 12, sm: 12, md: 12, lg: 6 }
        const propsGraficoLinha: PropsDTO = { xs: 12, sm: 12, md: 12, lg: 8 }

  
        // const leftCards = this.componentFactory.criarComponentGridCardLabelTituloDescricaoIconeIndicador(leftCardDTOs, propsCardsLeft)
        const tabela = this.componentFactory.criarComponentGridTabela(tabelaDTOs, propsTabela)
        // const graficoLinha = this.componentFactory.criarComponentGridGraficoLinha(totalGeralDTO, lineChartDTO, propsGraficoLinha)

        return <ClientesLayout
            // topCards={topCards}
            // leftCards={leftCards}
            tabelas={tabela}
            // graficoLinha={graficoLinha} 
            />
    }
}