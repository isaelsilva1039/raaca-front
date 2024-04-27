import React from 'react';
import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const MuiTableSkeleton = ({ rows = 5, columns = 3 }) => (
  <Table>
    <TableHead>
      <TableRow>
        {Array.from({ length: columns }, (_, index) => (
          <TableCell key={index}>
            <Skeleton variant="rectangular" height={30} width={100} />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }, (_, columnIndex) => (
            <TableCell key={columnIndex}>
              <Skeleton variant="rectangular" height={30} width={100} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default MuiTableSkeleton;
