import { API } from "@/core/api/api";

interface ProfissionalData {
  id: number;
  nome: string;
  cpf: string;
  data_nascimento: string;
  especialidade: string;
  email: string;
  fileInput: File | null;
  link_sala: any;
  fk_especialidade: any;
}

export const atualizarProfissional = async (
  profissionalData: ProfissionalData,
  onSuccess: (data: any) => void, // Callback para sucesso
  onError: (error: any) => void  // Callback para erro
) => {
  const url = `${API}/api/racca/profissional/atualizar/${profissionalData.id}`;
  const { nome, cpf, data_nascimento, especialidade, email, fileInput,link_sala,fk_especialidade } = profissionalData;


  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('cpf', cpf);
  formData.append('data_nascimento', data_nascimento);
  formData.append('especialidade', especialidade);
  formData.append('email', email);
  formData.append('link_sala', link_sala);
  formData.append('fk_especialidade', fk_especialidade);

  if (fileInput) {
    formData.append('file', fileInput);
  }

  console.log(profissionalData)
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
    onSuccess(data);
  } catch (error) {
    onError(error); 
  }
};
