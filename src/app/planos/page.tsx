"use client";

import React, { useState, useEffect } from "react";
import PlanForm from "./planForm";
import PlanList from "./listaPlanos";
import Typography from "@mui/material/Typography";
import { MdAddHomeWork } from "react-icons/md";
import { useCliente } from "@/core/helpes/UserContext";
import { obetemTodasEspecialidades } from "../api/especialidade/especialidades";
import {
  criarPlano,
  editarPlano,
  listarPlanos,
  deletarPlano,
} from "../api/planos/planosService";
import MuiTableSkeleton from "@/core/infra/ports/react/componentes/skeleton/MuiTableSkeleton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Specialty {
  specialty: string;
  consultationCount: string;
}

interface Plan {
  id: number | null;
  nome: string;
  description: string;
  fidelity: boolean;
  fidelityPeriod?: string;
  specialties: Specialty[];
  valor: string;
}

const mainContainerStyles: React.CSSProperties = {
  margin: "20px auto",
  padding: "20px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const addButtonStyles: React.CSSProperties = {
  marginBottom: "20px",
  padding: "10px 12px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#a500f7",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const MainPage: React.FC = () => {
  const [plans, setPlans] = useState<any>([]);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [especialidades, setEspecialidades] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { token } = useCliente();

  useEffect(() => {
    setLoading(true);
    getEspecialidadesAll();
    fetchPlans();
  }, [token]);

  const fetchPlans = async () => {
    try {
      const data = await listarPlanos(10, 1);
      setPlans(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlan = async (plan: Plan) => {
    try {
      let newPlan;
      if (plan.id === null) {
        newPlan = await criarPlano(plan);
        pushNotify("success", "Success", "Plano criado");
      } else {
        newPlan = await editarPlano(plan.id, plan);
        pushNotify("success", "Success", "Plano editado");
      }
      fetchPlans();
      setEditingPlan(null);
    } catch (error) {
      setError(error);
      pushNotify("error", "Error", "Erro ao criar plano");
    }
  };

  const handleDeletePlan = async (id: number) => {
    try {
      await deletarPlano(id);
      pushNotify("success", "Success", "Plano deletado");
      fetchPlans();
    } catch (error) {
      setError(error);
      pushNotify("error", "Error", "Erro ao deletar plano");
    }
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
  };

  const getEspecialidadesAll = () => {
    if (!token) return;

    const onFetchSuccess = (data: any) => {
      setEspecialidades(data.data);
    };

    const onFetchError = (error: any) => {
      setError(error.message);
    };

    obetemTodasEspecialidades(token, onFetchSuccess, onFetchError);
  };



  const pushNotify = (
    status: "success" | "error" | "info",
    title: string,
    text: string
  ) => {
    toast[status](text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: status,
    });
  };

  return (
    <div>
        <ToastContainer />

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
          Menu / Planos
        </Typography>
      </div>
      {loading ? (
        <MuiTableSkeleton />
      ) : (
        <div style={mainContainerStyles}>
          {editingPlan ? (
            ""
          ) : (
            <button
              style={addButtonStyles}
              onClick={() =>
                setEditingPlan({
                  id: null,
                  nome: "",
                  description: "",
                  fidelity: false,
                  fidelityPeriod: "",
                  specialties: [],
                  valor: "",
                })
              }
            >
              <MdAddHomeWork /> Adicionar Plano
            </button>
          )}

          {editingPlan ? (
            <PlanForm
              onSubmit={handleAddPlan}
              initialData={editingPlan}
              onCancel={handleCancelEdit}
              especialidades={especialidades}
            />
          ) : (
            <PlanList
              plans={plans}
              onDelete={handleDeletePlan}
              onEdit={handleEditPlan}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MainPage;
