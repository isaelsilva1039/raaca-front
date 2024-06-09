import { API } from "@/core/api/api";

export const putMeService = async (
    token: any,
    nome: any,
    email: any,
    cpf: any,
    senha: any,
    avatar: any,
    onSuccess: any,
    onError: any
) => {
    const url = `${API}/api/auth/editar`;

    const formData = new FormData();
    formData.append('name', nome);
    formData.append('email', email);
    formData.append('cpf', cpf);
    formData.append('senha', senha);
    formData.append('file', avatar);

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