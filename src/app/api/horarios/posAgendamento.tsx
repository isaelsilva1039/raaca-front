import { API } from "@/core/api/api";

export const postNovoAgendamento = async (
    medicoId: any,
    startTime: any,
    endTime: any,
    token: any ,
    onSuccess : any,
    onError : any
) => {
    const url = `${API}/api/racca/agenda/novo`;

    // Preparando os dados para envio
    const formData = new FormData();
    formData.append('medico_id', medicoId.toString());
    formData.append('start_time', startTime);
    formData.append('end_time', endTime);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
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
