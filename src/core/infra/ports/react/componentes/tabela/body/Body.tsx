
import {
    TableRow
} from '@mui/material';
import { Cell } from '../cell/Cell';

export const Body = (props: { body: string[][] }) => {
    const arrayResult = Object.values(props.body);
    return arrayResult.map((row, index: number) => {
        return (
            <TableRow
                hover
                key={index}
            >
                <Cell {...row} />
            </TableRow>
        );
    });
};