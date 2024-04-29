import { API } from "@/core/api/api";

interface ProfissionalData {
    nome: string;
    cpf: string;
    dataNascimento: string;
    especialidade: string;
    email: string;
    fileInput: File | null;

  }
  
  export const enviarProfissional = async (
    profissionalData: ProfissionalData,
    onSuccess: (data: any) => void, // Callback para sucesso
    onError: (error: any) => void  // Callback para erro
  ) => {
    const url = API + '/api/racca/profissional/novo';
    const { nome, cpf, dataNascimento, especialidade, email, fileInput } = profissionalData;
  
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('cpf', cpf);
    formData.append('data_nascimento', dataNascimento);
    formData.append('especialidade', especialidade);
    formData.append('email', email);


    if (fileInput) {
      formData.append('file', fileInput);
    }
  
    const options = {
      method: 'POST',
      body: formData,
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
      onSuccess(data); // Chamada do callback de sucesso
    } catch (error) {
      onError(error);  // Chamada do callback de erro
    }
  };
  

