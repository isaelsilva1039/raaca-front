import React from 'react';
import PropTypes from 'prop-types';

const AvatarPlaceholder = ({ avatarUrl, name, onClick, className } : any) => {
  // Define uma lista de cores para uso no fallback
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF33A5", "#33FFA1"];
  
  // Obtém a primeira letra do nome, ou usa '?' se o nome não estiver disponível
  const firstLetter = name ? name.charAt(0).toUpperCase() : '?';
  
  // Seleciona uma cor com base na primeira letra
  const colorIndex = firstLetter.charCodeAt(0) % colors.length;
  const backgroundColor = colors[colorIndex];

  return avatarUrl ? (
    <img
      src={avatarUrl}
      alt="Avatar"
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        marginRight: 10,
      }}
      onClick={onClick}
      className={className}
    />
  ) : (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        color: "white",
        fontWeight: "bold",
        fontSize: "20px",
      }}
      onClick={onClick}
      className={className}
    >
      {firstLetter}
    </div>
  );
};

AvatarPlaceholder.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default AvatarPlaceholder;
