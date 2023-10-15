import { Unstable_Grid2 as Grid } from "@mui/material"
import CardLabelTituloDescricaoIconeIndicadorDTO from "../../dto/CardLabelTituloDescricaoIconeIndicadorDTO"
import { CardLabelTituloDescricaoIconeIndicador } from "../card-label-titulo-descricao-icone-indicador/CardLabelTituloDescricaoIconeIndicador"

export const GridCardLabelTituloDescricaoIconeIndicador = (props: { dto: CardLabelTituloDescricaoIconeIndicadorDTO, chave: number }) => {
    return (
        <Grid xs={12} sm={12} md={12} lg={12} key={props.chave}>
            <CardLabelTituloDescricaoIconeIndicador dto={props.dto} />
        </Grid>
    )
}