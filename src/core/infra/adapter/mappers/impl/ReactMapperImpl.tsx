import CardLabelTituloDescricaoIconeIndicadorDTO from "@/core/infra/ports/react/dto/CardLabelTituloDescricaoIconeIndicadorDTO"
import { CardTituloDescricaoIconeDTO } from "@/core/infra/ports/react/dto/CardTituloDescricaoIconeDTO"
import PeriodoTituloDescricaoIndicadorDTO from "@/core/infra/ports/react/dto/PeriodoTituloDescricaoIndicadorDTO"
import { TabelaDTO } from "@/core/infra/ports/react/dto/TabelaDTO"
import ReactMapper from "../ReactMapper"
import HorizontalWidgetDTO from "@/core/domain/dto/HorizontalWidgetDTO"
import TotalTransacoesItemDTO from "@/core/domain/dto/TotalTransacoesItemDTO"
import TabelaDashboardDTO from "@/core/domain/dto/TabelaDashboardDTO"
import TotalGeralDTO from "@/core/domain/dto/TotalGeralDTO"
import { LineChartDTO } from "@/core/infra/ports/react/dto/LineChartDTO"
import OptionsDTO from "@/core/infra/ports/react/dto/OptionsDTO"

export default class ReactMapperImpl implements ReactMapper {
    constructor() { }

    toCardTituloDescricaoIconeDTO(dtos: HorizontalWidgetDTO[]): CardTituloDescricaoIconeDTO[] {
        return dtos.map((element) => {
            return {
                titulo: element?.valor,
                descricao: element?.descritivo,
                icone: element?.icone,
            }
        })
    }

    toCardLabelTituloDescricaoIconeIndicadorDTO(dtos: TotalTransacoesItemDTO[]): CardLabelTituloDescricaoIconeIndicadorDTO[] {
        return dtos.map((element) => {
            return {
                label: element.titulo,
                titulo: element.valor,
                descricao: element.descritivo,
                icone: element.icone,
                variacao: element.variacao,
            }
        })
    }

    toTabelaDTO(dtos: TabelaDashboardDTO[]): TabelaDTO[] {
        return dtos.map((element) => {
            return {
                titulo: element.titulo,
                headers: element.header,
                body: element.body,
            }
        })
    }

    toPeriodoTituloDescricaoIndicadorDTO(dto: TotalGeralDTO): PeriodoTituloDescricaoIndicadorDTO {
        return {
            titulo: dto.valor,
            descricao: "Total geral",
            variacao: dto.variacao,
        }
    }

    toLineChartDTO(dto: TotalGeralDTO): LineChartDTO {
        const options: OptionsDTO = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        color: "#A3AED0 ",
                        font: {
                            size: 12,
                            family: "DM Sans",
                        },
                    },
                },
                y: {
                    display: false,
                    grid: {
                        display: false,
                    },
                },
            },
        }

        return {
            options,
            valor: dto.valor,
            variacao: dto.variacao,
            data: {
                labels: dto.data.map((element) => {
                    return element.descritivo
                }),
                datasets: [
                    {
                        type: "line",
                        label: "Dataset",
                        data: dto.data.map((element) => {
                            return element.valor
                        }),
                        borderColor: "#4318FF",
                        fill: false,
                        lineTension: 0.4,
                        pointBorderColor: "#4318FF",
                        borderWidth: 4,
                        pointRadius: 0,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: "#ffffff",
                        pointHoverBorderColor: "#4318FF",
                        pointHoverBorderWidth: 4,
                        pointHitRadius: 50,
                    },
                ],
            },
        }
    }
}