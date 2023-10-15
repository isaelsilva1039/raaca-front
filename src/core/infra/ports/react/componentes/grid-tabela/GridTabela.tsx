import {
  Unstable_Grid2 as Grid
} from '@mui/material'
import { TabelaDTO } from '../../dto/TabelaDTO'
import { Tabela } from '../tabela/Tabela'

export const GridTabela = (props: { tabela: TabelaDTO, chave: number }) => {
  return (
    <Grid xs={12} lg={6} key={props.chave}>
      <Tabela tabela={props.tabela} />
    </Grid>
  )
}