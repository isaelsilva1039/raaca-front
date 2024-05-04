import { API } from "@/core/api/api";
import { WeeklySchedule } from "@/app/meus-horario/types";



export const fetchEventos = async (
    
    onSuccess: (data: any) => void, 
    onError: (error: any) => void ,
    token: any 
) => {
    const url = API + '/api/racca/agenda/agenda-cliente';

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



