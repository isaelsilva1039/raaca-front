import { API } from "@/core/api/api";

interface ProfissionalData {
  id: number;
}

export const deletarProfissional = async (
  profissionalData: ProfissionalData,
  onSuccess: (data: any) => void, // Callback para sucesso
  onError: (error: any) => void  // Callback para erro
) => {
  const url = `${API}/api/racca/profissional/delete/${profissionalData.id}`;


  const options = {
    method: 'DELETE',
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
