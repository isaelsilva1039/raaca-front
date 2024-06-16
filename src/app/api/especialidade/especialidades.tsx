import { API } from "@/core/api/api";

export const getEspecialidades = async (
    per_page: number,
    page: number,
    token: any,
    onSuccess: (data: any) => void,
    onError: (error: any) => void,
  ) => {
    const url =  API + `/api/especialidades/index?per_page=${per_page}&page=${page}`;
  
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



  export const postEspecialidades = async (
    nome: any,
    token: any,
    onSuccess: (data: any) => void,
    onError: (error: any) => void,
  ) => {
    const url =  API + `/api/especialidades/create`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            nome
          }),
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


  export const putEspecialidades = async (
    id: any,
    nome: any,
    token: any,
    onSuccess: (data: any) => void,
    onError: (error: any) => void,
  ) => {
    const url =  API + `/api/especialidades/update/${id}`;
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            nome
          }),
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



  export const deleteEspecialidades = async (
    id: any,
    token: any,
    onSuccess: (data: any) => void,
    onError: (error: any) => void,
  ) => {
    const url =  API + `/api/especialidades/excluir/${id}`;
  
    try {
      const response = await fetch(url, {
        method: "DELETE",
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
  