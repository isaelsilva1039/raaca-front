import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from '../scrollbar/scrollbar';
import { TabelaDTO } from '../../dto/TabelaDTO';
import { Body } from './body/Body';
import { Header } from './header/Header';
import { styleCard, styleCardHeader, styleScrollbar } from './style';

export const Tabela = (props: { tabela: TabelaDTO }) => {
  return (
    <Card sx={styleCard}>
      <CardHeader title={props.tabela.titulo} style={styleCardHeader} />
      <Scrollbar sx={styleScrollbar}>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <Header headers={props.tabela.headers} />
              </TableRow>
            </TableHead>
            <TableBody>
              <Body body={props.tabela.body} />
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
    </Card>
  );
};