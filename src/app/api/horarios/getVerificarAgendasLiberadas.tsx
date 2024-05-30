import { API } from "@/core/api/api";

export const getVerificarAgendasLiberadas = async (
    token: any,
    onSuccess: (data: any) => void,
    onError: (error: any) => void,

  ) => {

    const url =  API + `/api/auth/me`;
  
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
      // Chama a função onSuccess passando os dados como argumento
      onSuccess(data);
    } catch (error) {
      // Chama a função onError passando o erro como argumento
      onError(error);
    }
  };