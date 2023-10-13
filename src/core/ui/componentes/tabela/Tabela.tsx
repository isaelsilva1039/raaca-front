import {
  Box,
  Card,
  CardHeader,
  Divider,
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
    return (
      <TableCell
        style={{
          fontFamily: "DM Sans, Helvetica",
          fontSize: "14px",
          color: "#A3AED0",
          fontWeight: "500",
          lineHeight: "normal",
          letterSpacing: "-0.28px",
          borderBottom: "1px solid #F4F7FE"
        }}>
        {header}
      </TableCell>);
  });

  const body = props.body.map((row, index: number) => {
    const cells = row.map((cell) => {
      return (<TableCell style={{
        fontFamily: "DM Sans, Helvetica",
        fontSize: "14px",
        color: "#2B3674",
        lineHeight: "normal",
        letterSpacing: "-0.28px",
        fontWeight: "bold",
        borderBottom: "none"
      }}>{cell}</TableCell>);
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
    <Card sx={{ height: "100%", borderRadius: '8px', boxShadow: "none" }}>
      <CardHeader title={props.titulo} style={{
        color: "#2B3674"
      }} />
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