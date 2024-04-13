'use client'

import { useMemo } from 'react';
// @ts-ignore
import { useTable } from 'react-table';

import './style.css'
import { Typography } from '@mui/material';

export default function Gerenciador() {
  const data = useMemo(() => [
    { nome: 'Produto A', quantidade: 20, descricao: 'Produto A desc' },
    { nome: 'Produto B', quantidade: 30, descricao: 'Produto B desc' },
    { nome: 'Produto C', quantidade: 10, descricao: 'Produto C desc' },
  ], []);

  const columns = useMemo(() => [
    { Header: 'Nome', accessor: 'nome' },
    { Header: 'Quantidade', accessor: 'quantidade' },
    { Header: 'Descrição', accessor: 'descricao' }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className='container-clientes'>
        <Typography
                        sx={{
                            color: "#707EAE",
                            fontWeight: "500",
                            lineHeight: "24px",
                            fontSize: "15px",
                        }}
                    >
                        Menu / Clientes
                    </Typography>
                    <div className='tabela'>
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
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}