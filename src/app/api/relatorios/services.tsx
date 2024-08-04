import { API } from "@/core/api/api";

export const relatorioDeConsultasPorMedico = async (
  token: any,
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
  startDate: string,
  endDate: string,
  perPage: number = 100,
  page: number = 1
) => {
  const url = `${API}/api/relatorios/agendamentos/medicos?start_date=${startDate}&end_date=${endDate}&per_page=${perPage}&page=${page}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};



export const relatoriosAgendamentos = async (
  token: any,
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
  startDate: string,
  endDate: string,
  perPage: any,
  page: any
) => {
  const url = `${API}/api/relatorios/agendamentos?start_date=${startDate}&end_date=${endDate}&per_page=${perPage}&page=${page}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};
