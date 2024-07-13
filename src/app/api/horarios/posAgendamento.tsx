import { API } from "@/core/api/api";

export const postNovoAgendamento = async (
    medicoId: any,
    startTime: any,
    endTime: any,
    especialidadeProfissional: any,
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
    formData.append('especialidade_id', especialidadeProfissional);


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




export const updateAgendamento = async (
    agendamentoId : any, // ID do agendamento a ser atualizado
    medicoId : any,
    startTime : any,
    endTime : any,
    token :any,
    status : any,
    onSuccess : any,
    onError : any,
) => {
    const url = `${API}/api/racca/agenda/atualizar/${agendamentoId}`; // Ajuste o endpoint conforme necessário

     const payload = {
        medico_id: medicoId,
        start_time: startTime,
        end_time: endTime,
        status: status
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)

        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response}`);
        }

        const data = await response.json();
        onSuccess(data);
    } catch (error) {
        onError(error);
    }
};

