import { API } from "@/core/api/api";


export const postChamados = async (

    titulo : any,
    interacao_assunto : any,
    situacao: any,
    token : any,
    onSuccess : any,
    onError : any,
    chave: any, 
  ) => {
    const url = API + "/api/chamados/create";
  
    // Preparando os dados para envio
    const formData = new FormData();
    formData.append("situacao", situacao);

    formData.append("titulo", titulo);
    formData.append("interacao_assunto", interacao_assunto);
    formData.append('chave',chave)


    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      onSuccess(data);
    } catch (error) {
      onError(error);
    }
  };



  export const obtemChamados = async (
    per_page: number,
    page: number,
    token: any,
    onSuccess: (data: any) => void,
    onError: (error: any) => void,
    searchTerm?: string, // Parâmetro opcional para busca
  ) => {
    let url =  API + `/api/chamados/obtem?per_page=${per_page}&page=${page}`;
  
      // Adiciona o parâmetro de busca à URL se ele estiver presente
    if (searchTerm) {
      url += `&search=${encodeURIComponent(searchTerm)}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
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
  