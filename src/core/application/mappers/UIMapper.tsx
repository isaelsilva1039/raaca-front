import HorizontalWidgetDTO from "@/core/domain/DTO/dashboard/HorizontalWidgetDTO";
import TabelaDTO from "@/core/domain/DTO/dashboard/TabelaDTO";
import TotalGeralDTO from "@/core/domain/DTO/dashboard/TotalGeralDTO";
import TotalTransacoesItemDTO from "@/core/domain/DTO/dashboard/TotalTransacoesItemDTO";
import CartaoGenericoComIndicadorProps from "@/core/ui/componentes/cartao-generico-indicador/CartaoGenericoComIndicadorProps";
import { CartaoGenericoComIndicador } from "@/core/ui/componentes/cartao-generico-indicador/cartao-generico-indicador";
import CartaoGenericoProps from "@/core/ui/componentes/cartao-generico/CartaoGenericoProps";
import { CartaoGenerico } from "@/core/ui/componentes/cartao-generico/cartao-generico";
import Options from "@/core/ui/componentes/grafico-linha/options";
import { Tabela } from "@/core/ui/componentes/tabela/Tabela";
import { TabelaProps } from "@/core/ui/componentes/tabela/TabelaProps";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { Grid } from "@mui/material";

export default class UIMapper {
    
    static toCartaoGenericoComIndicadorPropsArray(totalTransacoes: TotalTransacoesItemDTO[]) {
        return totalTransacoes.map((element) => {
            const cartaoGenericoComIndicadorProps: CartaoGenericoComIndicadorProps = {
                valor: element.valor,
                descritivo: element.descritivo,
                icone: SmartphoneIcon,
            };
            return (<Grid><CartaoGenericoComIndicador {...cartaoGenericoComIndicadorProps} /></Grid>);
        });
    }

    static toCartaoGenericoPropsArray(horizontalWidgets: HorizontalWidgetDTO[]) {
        return horizontalWidgets.map((element, index) => {
            const cartaoGenericoProps: CartaoGenericoProps = {
                valor: element.valor,
                descritivo: element.descritivo,
                icone: SmartphoneIcon,
            };
            return (<Grid key={index} xs={12} sm={6} lg={3}><CartaoGenerico {...cartaoGenericoProps} /></Grid>
            );
        });
    }

    static criarTabelas(tabelas: TabelaDTO[]) {
        return tabelas.map((element) => {
            const tabelaProps: TabelaProps = {
                titulo: element.titulo,
                headers: element.header,
                body: element.body,
            };
            return (<Grid xs={12} lg={6}><Tabela {...tabelaProps} /></Grid>);
        });
    }

    static toLineChartProps(totalGeral: TotalGeralDTO) {
        const options: Options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true,
                        color: '#A3AED0 ',
                        font: {
                            size: 12,
                            family: 'Arial, sans-serif',
                        },
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false,
                    },
                }
            }
        };

        const values: number[] = totalGeral.data.map((element) => {
            return element.valor
        })

        return {
            options,
            valor: totalGeral.valor,
            data: {
                labels: totalGeral.data.map((element) => { return element.descritivo }),
                datasets: [{
                    type: "line",
                    label: "Dataset",
                    data: values,
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
                }]
            },
        }
    }
}