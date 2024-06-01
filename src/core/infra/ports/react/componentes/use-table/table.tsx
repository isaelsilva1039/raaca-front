import React from 'react';
import { useTable, useExpanded } from 'react-table';

interface IData {
  id: number;
  descricao: string;
  tempo_consulta: string;
}

interface ICustomTableProps {
  columns: any;
  data: any;
  expandedRows: { [key: string]: boolean };
  toggleRowExpanded: (rowId: string) => void;
  renderRowSubComponent: (props: { row: any }) => JSX.Element;
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
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={`header-group-${headerGroup.id}`}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={`column-${column.id}`}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          const isExpanded = expandedRows[row.id.toString()];
          return (
            <React.Fragment key={`row-fragment-${row.id}`}>
              <tr {...row.getRowProps()} onClick={() => toggleRowExpanded(row.id.toString())}>
                {row.cells.map((cell, cellIndex) => (
                  <td {...cell.getCellProps()} key={`cell-${row.id}-${cellIndex}`}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>

              {isExpanded && (
                <tr key={`expanded-${row.id}`}>
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
