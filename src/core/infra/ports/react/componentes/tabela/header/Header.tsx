
import { TableCell } from '@mui/material';
import { styleTableCell } from './style';

export const Header = (props: {headers: string[]}) => {
    const arrayResult = Object.values(props.headers);
    return arrayResult.map((header) => {
        return (
            <TableCell style={styleTableCell}>
                {header}
            </TableCell>
        );
    });
};