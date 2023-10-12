import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from '../scrollbar/scrollbar';
import { TabelaProps } from './TabelaProps';

export const Tabela = (props: TabelaProps) => {

  const headers = props.headers.map((header) => {
    return (<TableCell>{header}</TableCell>);
  });

  const body = props.body.map((row, index: number) => {
    const cells = row.map((cell) => {
      return (<TableCell>{cell}</TableCell>);
    });
    return (
      <TableRow
        hover
        key={index}
      >
        {cells}
      </TableRow>
    );
  });

  return (
    <Card sx={{ height: "100%", borderRadius: '8px' }}>
      <CardHeader title={props.titulo} />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {headers}
              </TableRow>
            </TableHead>
            <TableBody>{body}</TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
    </Card>
  );
};
