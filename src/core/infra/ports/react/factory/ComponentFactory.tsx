import {
    Unstable_Grid2 as Grid,
} from "@mui/material"
import { GraficoLinha } from "../componentes/grafico-linha/grafico-linha"
import { CardLabelTituloDescricaoIconeIndicador } from "../componentes/card-label-titulo-descricao-icone-indicador/CardLabelTituloDescricaoIconeIndicador"
import { CardTituloDescricaoIcone } from "../componentes/card-titulo-descricao-icone/CardTituloDescricaoIcone"
import { Tabela } from "../componentes/tabela/Tabela"
import { TabelaDTO } from "../dto/TabelaDTO"
import { CardTituloDescricaoIconeDTO } from "../dto/CardTituloDescricaoIconeDTO"
import CardLabelTituloDescricaoIconeIndicadorDTO from "../dto/CardLabelTituloDescricaoIconeIndicadorDTO"
import PeriodoTituloDescricaoIndicadorDTO from "../dto/PeriodoTituloDescricaoIndicadorDTO"
import { LineChartDTO } from "../dto/LineChartDTO"
import PropsDTO from "../dto/PropsDTO"

export default class ComponentFactory {

    criarComponentGridTabela(tabelaDTOs: TabelaDTO[], props: PropsDTO) {
        return tabelaDTOs.map((tabelaDTO, index: number) => {
            return (
                <Grid key={index} xs={props.xs} sm={props.sm} md={props.md} lg={props.lg}>
                    <Tabela tabela={tabelaDTO} />
                </Grid>
            )
        })
    }

    criarComponentGridCardTituloDescricaoIcone(dtos: CardTituloDescricaoIconeDTO[], props: PropsDTO) {
        return dtos.map((element, number: number) => {
            return (
                <Grid key={number} xs={props.xs} sm={props.sm} md={props.md} lg={props.lg}>
                    <CardTituloDescricaoIcone dto={element} />
                </Grid>
            )
        })
    }

    criarComponentGridCardLabelTituloDescricaoIconeIndicador(dtos: CardLabelTituloDescricaoIconeIndicadorDTO[], props: PropsDTO) {
        return dtos.map((dto, index: number) => {
            return (
                <Grid key={index} xs={props.xs} sm={props.sm} md={props.md} lg={props.lg}>
                    <CardLabelTituloDescricaoIconeIndicador dto={dto} />
                </Grid>
            )
        })
    }

    criarComponentGridGraficoLinha(totalGeralDTO: PeriodoTituloDescricaoIndicadorDTO, lineChartDTO: LineChartDTO, props: PropsDTO) {
        return (
            <Grid xs={props.xs} sm={props.sm} md={props.md} lg={props.lg}>
                <GraficoLinha totalGeralDTO={totalGeralDTO} lineChartDTO={lineChartDTO} />
            </Grid>
        )
    }
}