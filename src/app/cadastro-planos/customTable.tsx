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
  expandedRows: { [key: number]: boolean };
  toggleRowExpanded: (rowId: number) => void;
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
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          const isExpanded = expandedRows[row.id];
          return (
            <React.Fragment key={row.id}>
              <tr {...row.getRowProps()} onClick={() => toggleRowExpanded(row.id)}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
              {isExpanded ? (
                <tr>
                  <td colSpan={columns.length}>
                    {renderRowSubComponent({ row })}
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomTable;
