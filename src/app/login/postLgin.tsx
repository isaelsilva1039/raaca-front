import { API } from "@/core/api/api";

export const postLogin = async (
  email: string,
  senha: string,
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  const url = `${API}/api/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(senha)}`;

  const options = {
    method: 'POST',
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
    onSuccess(data); // Chama a função de sucesso com os dados recebidos
  } catch (error) {
    onError(error); // Chama a função de erro se algo der errado
  }
};
