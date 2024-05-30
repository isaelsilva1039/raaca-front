import { API } from "@/core/api/api";

export const getClientes = async (
    per_page: number,
    page: number,
    token: any,
    onSuccess: (data: any) => void,
    onError: (error: any) => void,
  ) => {
    const url =  API + `/api/racca/clientes?per_page=${per_page}&page=${page}`;
  
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
  


  export const postClientesUser = async (
    clienteId : number,
    token: any,
    onSuccess: (data: any) => void,
    onError: (error: any) => void,
  ) => {
    const url =  API + `/api/racca/vincular/cliente/${clienteId}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
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
  

  



  
  export const liberarConsultas = async (
    userId: any,
    token: any,
    quantidadeConsultas: number,
    inicioData: string,
    fimData: string,
    onSuccess: (data: any) => void,
    onError: (error: any) => void,
  ) => {
  
    const url = API + `/api/racca/consultas/liberar/user/${userId}`;
  
    // Prepara o corpo da requisição
    const requestBody = {
      quantidade_consultas: quantidadeConsultas,
      inicio_data: inicioData,
      fim_data: fimData,
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody), // Converte o corpo para JSON
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
  