'use client'

import { useMemo } from 'react';
// @ts-ignore
import { useTable } from 'react-table';

import './style.css'
import { Typography } from '@mui/material';

interface IData {
  nome: string;
  quantidade: number;
  descricao: string;
}


export default function Gerenciador() {


  // Dados mockados
  const data = useMemo<IData[]>(
    () => [
      { nome: "Produto A", quantidade: 20, descricao: "Produto A desc" },
      { nome: "Produto B", quantidade: 30, descricao: "Produto B desc" },
      { nome: "Produto C", quantidade: 10, descricao: "Produto C desc" },
    ],
    []
  );

  // Colunas com tipagem explícita baseada na interface IData.
  const columns = useMemo(
    () => [
      { Header: "Nome", accessor: "nome" as const }, // as const garante que o tipo seja preservado como literal
      { Header: "Quantidade", accessor: "quantidade" as const },
      { Header: "Descrição", accessor: "descricao" as const },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });


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
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup?.id} >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} key={column?.id}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row?.id} >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell?.column?.id}>{cell.render("Cell")}  </td>
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