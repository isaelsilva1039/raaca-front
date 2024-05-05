import { API } from "@/core/api/api";
import { WeeklySchedule } from "@/app/meus-horario/types";



export const getDisponibilidade = async (
    medico_id: number | string,
    start_time: any,
    end_time: any,
    onSuccess: (data: any) => void, 
    onError: (error: any) => void ,
    token: any 
) => {


    const url = API + `/api/racca/profissional/horario/verificar?medico_id=${medico_id}&start_time=${start_time}&end_time=${end_time}`;

    try {
      const response = await fetch(url, {   
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },

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



export const buscarHorariosDisponiveisMedico = async (
  medicoId: number,
  dia: string,
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
  token: any
) => {
  const url =  API + `/api/racca/agenda/agend-disponivel/${medicoId}?dia=${dia}`;

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
