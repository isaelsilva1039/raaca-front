import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import CustomTable from "@/core/infra/ports/react/componentes/use-table/table";
import CustomPagination from "@/core/infra/ports/react/componentes/paginacao/paginacao";
import { getEspecialidades } from "../api/especialidade/especialidades";
import { useCliente } from "@/core/helpes/UserContext";
import MuiTableSkeleton from "@/core/infra/ports/react/componentes/skeleton/MuiTableSkeleton";

const SpecialtyList = ({ specialties, onDelete, onEdit, onUpdateNew }: any) => {
  const [expandedRows, setExpandedRows] = useState<any>([]);

  const { token, user } = useCliente();
  const [page, setStatePage] = useState<number>(1);
  const [per_page, setStateper_page] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<any>();
  const [especialidades, setEspecialidade] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleRowExpanded = () => {};

  const handleDelete = (id: any) => {
    onDelete(id);
  };

  const handleEdit = (specialty: any) => {
    onEdit(specialty);

    console.log(specialty);
  };

  const renderRowSubComponent = (row: any) => {
    const specialty = row.original;
    return (
      <div>
        {/* Conteúdo adicional pode ser renderizado aqui se necessário */}
      </div>
    );
  };

  const columns = [
    {
      Header: "Id",
      accessor: "id",
      Cell: ({ value }: any) => <div>{value}</div>,
    },
    {
      Header: "Descrição",
      accessor: "nome",
      Cell: ({ value }: any) => <div>{value}</div>,
    },
    {
      Header: "Ações",
      Cell: ({ row }: any) => (
        <div>
          <Tooltip title="Editar">
            <IconButton onClick={() => handleEdit(row.original)}>
              <FaUserEdit size={18} color="#707EAE" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar">
            <IconButton onClick={() => handleDelete(row.original.id)}>
              <FaTrash color="red" size={14} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (onUpdateNew) {
      getEspecialidadesAction();
    }
  }, [onUpdateNew]);

  useEffect(() => {
    getEspecialidadesAction();
  }, [per_page, page, token]);

  const getEspecialidadesAction = () => {
    if (!token) return;
    setLoading(true);
    getEspecialidades(
      per_page,
      page,
      token,
      (data) => {
        console.log();
        setEspecialidade(data.data);
        setCurrentPage(data.meta);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <>
      {loading ? (
        <MuiTableSkeleton />
      ) : (
        <div>
          <CustomTable
            columns={columns}
            data={especialidades}
            expandedRows={expandedRows}
            toggleRowExpanded={toggleRowExpanded}
            renderRowSubComponent={renderRowSubComponent}
          />
        </div>
      )}
      <div className="paginacao">
        <CustomPagination
          currentPage={page}
          totalPages={currentPage?.lastPage}
          onPageChange={setStatePage}
        />
      </div>
    </>
  );
};

export default SpecialtyList;
