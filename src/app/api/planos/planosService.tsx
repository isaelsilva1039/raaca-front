import { API } from "@/core/api/api";

const API_BASE_URL = API + '/api'; // Ajuste a URL conforme necessário


const authHeader = (): HeadersInit => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };
};

interface Specialty {
    specialty: string;
    consultationCount: number;
  }
  
  interface Plan {
    id: number | null;
    nome: string;
    descricao: string;
    fidelidade: boolean;
    periodo_fidelidade?: string;
    valor: number;
    especialidades: Specialty[];
  }

export const criarPlano = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/planos/create`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(data)
  });
  return response.json();
};

export const editarPlano = async (id: number, data : any) => {
  const response = await fetch(`${API_BASE_URL}/planos/update/${id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(data)
  });
  return response.json();
};

export const deletarPlano = async (id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/planos/delete/${id}`, {
    method: 'DELETE',
    headers: authHeader()
  });
};

export const listarPlanos = async (perPage: number, page: number) => {
  const response = await fetch(`${API_BASE_URL}/planos/lista?per_page=${perPage}&page=${page}`, {
    method: 'GET',
    headers: authHeader()
  });
  const data = await response.json();
  return data.data;
};
