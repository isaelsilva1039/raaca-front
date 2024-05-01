import { API } from "@/core/api/api";

// Definindo a interface para representar os dados de resposta para um profissional
interface Profissional {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
    especialidade: string;
    email: string;
    avatarUrl?: string; // Opcional se você retornar a URL do avatar
  }
  
  export const fetchProfissionais = async (
    searchTerm : string,
    currentPage: number,
    onSuccess: (profissionais: Profissional[]) => void, // Callback para sucesso
    onError: (error: any) => void ,
    token: any
  ) => {
    const url = API + `/api/racca/profissional/all?page=${currentPage}&per_page=${8}&termo=${searchTerm}`;
  
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      onSuccess(data);
    } catch (error) {
      onError(error);
    }
  };
  