import { Unstable_Grid2 as Grid } from "@mui/material"
import { CardTituloDescricaoIcone } from "../card-titulo-descricao-icone/CardTituloDescricaoIcone"
import { CardTituloDescricaoIconeDTO } from "../../dto/CardTituloDescricaoIconeDTO"

export const GridCardTituloDescricaoIcone = (props: { dto: CardTituloDescricaoIconeDTO, chave: number }) => {
    return (
        <Grid key={props.chave} xs={12} sm={12} md={6} lg={3}>
            <CardTituloDescricaoIcone dto={props.dto} />
        </Grid>
    )
}