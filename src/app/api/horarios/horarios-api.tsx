import { API } from "@/core/api/api";
import { WeeklySchedule } from "@/app/meus-horario/types";

export const saveSchedule = async (
    schedule: WeeklySchedule,
    token: any ,
    onSuccess: (data: any) => void, // Callback para sucesso
    onError: (error: any) => void // Callback para erro
) => {
    const url = API + '/api/racca/horarios/create/horario';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ horarios: schedule }),

      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      onSuccess(data); // Chamar callback de sucesso
    } catch (error) {
      onError(error); // Chamar callback de erro
    }
};



export const fetchSchedule = async (
    token: any ,
    onSuccess: (data: any) => void, 
    onError: (error: any) => void 
) => {
    const url = API + '/api/racca/horarios/action/horario';

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

  }



export const fetchMes = async (
  token: any ,
  medico_id: any,
  onSuccess: (data: any) => void, 
  onError: (error: any) => void,
  ativo : any,
) => {
  const url = API + `/api/racca/agenda/calendario/mes/${medico_id}?ativo=${ativo}`;

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

