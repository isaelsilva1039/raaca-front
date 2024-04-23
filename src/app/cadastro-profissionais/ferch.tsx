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
    onSuccess: (profissionais: Profissional[]) => void, // Callback para sucesso
    onError: (error: any) => void // Callback para erro
  ) => {
    const url = 'http://127.0.0.1:8000/api/racca/profissional/all';
  
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
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
  