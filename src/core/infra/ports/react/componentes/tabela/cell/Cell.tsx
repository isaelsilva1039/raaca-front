import { TableCell } from '@mui/material';
import { styleTableCell } from './style';

export const Cell = (row: string[]) => {
    return Object.values(row).map((cell) => {
        return (<TableCell style={styleTableCell}>{cell}</TableCell>);
    });
};