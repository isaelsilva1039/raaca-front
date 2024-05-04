import Image from 'next/image';

const avatarPadrao = '/img/default-avatar.jpg';  // Caminho correto para imagem padrão local

// Exemplo de função para garantir que a URL é válida
function formatImageUrl(url : any) {
  if (url.startsWith('http') || url.startsWith('/')) {
    return url;  // Retorna a URL como está se já for uma URL completa ou um caminho absoluto
  } else {
    return `/${url}`;  // Adiciona uma barra no início se for um caminho relativo
  }
}

const AvatarImage = ({ src } : any) => {

  
    if(!src) return;


    // Remove as aspas da string se estiverem presentes e verifica se src é nulo antes de manipulá-lo
    const cleanedAvatar = src ? src.replace(/^"|"$/g, '') : null;

    const url = formatImageUrl(cleanedAvatar)
    
    if(url == '/null') {
      return <img src='./img/image.jpg'  className="profile-image"/>;
    };

  return (
    <Image
      src={url ? url : avatarPadrao }
      width={100}  // Exemplo de largura
      height={100}  // Exemplo de altura
      alt="Profile"
      className="profile-image"
    />
  );
};

export default AvatarImage;
