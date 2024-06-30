'use client';

import React from 'react';
import { useTable, useExpanded, Row } from 'react-table';

interface IData {
  id: number;
  descricao: string;
  tempo_consulta: string;
}

interface ICustomTableProps {
  columns: any;
  data: IData[];
  expandedRows: any;
  toggleRowExpanded: (rowId: any) => void;
  renderRowSubComponent: (props: { row: Row<IData> }) => JSX.Element;
}

const CustomTable: React.FC<ICustomTableProps> = ({
  columns,
  data,
  expandedRows,
  toggleRowExpanded,
  renderRowSubComponent,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useExpanded
  );

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup, hgIndex) => (  // Added hgIndex for unique key
          <tr {...headerGroup.getHeaderGroupProps()} key={`header-group-${hgIndex}`}>
            {headerGroup.headers.map((column, columnIndex) => (  // Added columnIndex for unique key
              <th {...column.getHeaderProps()} key={`header-${columnIndex}`}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {  // Added rowIndex for unique key
          prepareRow(row);
          const isExpanded = expandedRows[rowIndex];
          return (
            <React.Fragment key={`row-${row.id}`}>
              <tr {...row.getRowProps()} onClick={() => toggleRowExpanded(row?.id)}>
                {row.cells.map((cell, cellIndex) => (  // Added cellIndex for unique key
                  <td {...cell.getCellProps()} key={`cell-${row.id}-${cellIndex}`}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
              {isExpanded && (
                <tr key={`expanded-row-${row.id}`}>
                  <td colSpan={columns.length}>
                    {renderRowSubComponent({ row })}
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomTable;
