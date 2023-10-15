import Head from "next/head";
import {
    Box,
    Container,
    Unstable_Grid2 as Grid,
    Typography,
} from "@mui/material";
import { GraficoLinha } from "../componentes/grafico-linha/grafico-linha";
import PeriodoTituloDescricaoIndicadorDTO from "../dto/PeriodoTituloDescricaoIndicadorDTO";
import { CardTituloDescricaoIconeDTO } from "../dto/CardTituloDescricaoIconeDTO";
import { GridCardTituloDescricaoIcone } from "../componentes/grid-card-titulo-descricao-icone/GridCardTituloDescricaoIcone";
import CardLabelTituloDescricaoIconeIndicadorDTO from "../dto/CardLabelTituloDescricaoIconeIndicadorDTO";
import { TabelaDTO } from "../dto/TabelaDTO";
import { GridTabela } from "../componentes/grid-tabela/GridTabela";
import { GridCardLabelTituloDescricaoIconeIndicador } from "../componentes/grid-card-label-titulo-descricao-icone-indicador/GridCardLabelTituloDescricaoIconeIndicador";
import { LineChartDTO } from "../dto/LineChartDTO";

export default class PageFactory {
    renderDashboard(
        topCardsDTOs: CardTituloDescricaoIconeDTO[],
        leftCardDTOs: CardLabelTituloDescricaoIconeIndicadorDTO[],
        tabelaDTOs: TabelaDTO[],
        totalGeralDTO: PeriodoTituloDescricaoIndicadorDTO,
        lineChartDTO: LineChartDTO
    ): JSX.Element {
        return (
            <>
                <Head>
                    <title>SWIFTPay | Início</title>
                </Head>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 3,
                    }}
                >
                    <Container maxWidth={false}>
                        <Typography
                            sx={{
                                color: "#707EAE",
                                fontWeight: "500",
                                lineHeight: "24px",
                                fontSize: "15px",
                            }}
                        >
                            Menu / Dashboard
                        </Typography>
                        
                        <Grid container spacing={2} marginTop={"12px"}>
                            {this.renderTopCards(topCardsDTOs)}
                            <Grid
                                xs={12}
                                md={12}
                                lg={4}
                                container
                                direction="column"
                                spacing={2}
                            >
                                {this.renderLeftCards(leftCardDTOs)}
                            </Grid>
                            <Grid xs={12} md={12} lg={8}>
                                <GraficoLinha totalGeralDTO={totalGeralDTO} lineChartDTO={lineChartDTO} />
                            </Grid>
                            {this.renderTabela(tabelaDTOs)}
                        </Grid>
                    </Container>
                </Box >
            </>
        );
    }

    private renderTabela(tabelaDTOs: TabelaDTO[]) {
        return tabelaDTOs.map((tabelaDTO, index: number) => {
            return <GridTabela tabela={tabelaDTO} chave={index} />
        })
    }

    private renderTopCards(dtos: CardTituloDescricaoIconeDTO[]) {
        return dtos.map((element, number: number) => {
            return <GridCardTituloDescricaoIcone dto={element} chave={number} />
        });
    }

    private renderLeftCards(dtos: CardLabelTituloDescricaoIconeIndicadorDTO[]) {
        return dtos.map((dto, index: number) => {
            return <GridCardLabelTituloDescricaoIconeIndicador dto={dto} chave={index} />
        });
    }
}