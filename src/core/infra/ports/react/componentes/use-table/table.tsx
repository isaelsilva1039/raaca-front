import React, { useState } from 'react';
import { useTable, useExpanded } from 'react-table';

const CustomTable = ({ columns, data, expandedRows, toggleRowExpanded, renderRowSubComponent }: any) => {



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable <any>(
    {
      columns,
      data,
    },
  );
  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={columns?.id}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={columns?.id}>{column.render("Header") }  </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps() } key={columns?.id}>
        {rows.map(row => {
          prepareRow(row);
          const isExpanded = expandedRows[row?.original?.id];
          return (
            <>
              <tr {...row.getRowProps()  } onClick={() => toggleRowExpanded(row.original.id) } key={row?.original?.id}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()  } key={cell?.row?.id}>{cell.render("Cell")  }</td>
                ))}
              </tr>
              {isExpanded && (
                <tr key={row?.original?.id}>
                  <td colSpan={columns.length} key={row?.original?.id}>
                    {renderRowSubComponent ? renderRowSubComponent({row}) : null}
                  </td>
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomTable;