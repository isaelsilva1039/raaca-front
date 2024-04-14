"use client";
import React, { useMemo, useState } from "react";
import ProfessionalFormModal from "@/core/infra/ports/react/modal-profissional/ProfessionalFormModal";

import { Button } from "react-bootstrap";
import { Typography } from "@mui/material";
import { useTable } from "react-table";
import "../clientes/style.css";
import "./styles.css";


interface IData {
  nome: string;
  quantidade: number;
  descricao: string;
}

export default function Professional() {
  const [modalShow, setModalShow] = useState(false);

  // Dados mockados
  const data = useMemo<IData[]>(
    () => [
      { key:1, nome: "Produto A", quantidade: 20, descricao: "Produto A desc" },
      { key:2, nome: "Produto B", quantidade: 30, descricao: "Produto B desc" },
      { key:3, nome: "Produto C", quantidade: 10, descricao: "Produto C desc" },
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
    <div className="container">

      <Typography
        className="list-top"
        sx={{
          color: "#707EAE",
          fontWeight: "500",
          lineHeight: "24px",
          fontSize: "15px",
        }}
      >
        Menu / Profissionais
      </Typography>

      <Button variant="primary" onClick={() => setModalShow(true)}>
        Adicionar Novo Profissional
      </Button>

        <div className="container-modal">
        <ProfessionalFormModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
      />
        </div>
     

      <div className="tabela">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps() } key={headerGroup?.id} >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps() } key={column?.id}>
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
                    <td {...cell.getCellProps() } key={cell?.column?.id}>{cell.render("Cell") }  </td>
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
