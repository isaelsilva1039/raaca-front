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
        body: JSON.stringify(schedule),
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

