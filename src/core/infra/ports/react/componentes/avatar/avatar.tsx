import Image from 'next/image';

const avatarPadrao = '/img/avatarRacca.jpeg';  // Caminho correto para imagem padrão local

// Exemplo de função para garantir que a URL é válida
function formatImageUrl(url: any) {
  if (url && (url.startsWith('http') || url.startsWith('/'))) {
    return url;  // Retorna a URL como está se já for uma URL completa ou um caminho absoluto
  } else {
    return `/${url}`;  // Adiciona uma barra no início se for um caminho relativo
  }
}

const AvatarImage = ({ src }: any) => {
  // Remove as aspas da string se estiverem presentes e verifica se src é nulo antes de manipulá-lo
  const cleanedAvatar = src ? src.replace(/^"|"$/g, '') : null;
  const url = cleanedAvatar ? formatImageUrl(cleanedAvatar) : avatarPadrao;

  console.log('URL da Imagem:', url);  // Log para depuração

  return (
    <Image
      src={url}
      width={60}  // Ajuste a largura conforme necessário
      height={60}  // Ajuste a altura conforme necessário
      alt="Profile"
      className="profile-image"
    />
  );
};

export default AvatarImage;
