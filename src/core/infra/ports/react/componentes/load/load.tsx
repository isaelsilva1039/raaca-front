import React from 'react';
import './styles.css';  // Importa o CSS do componente

const LoadingSpinner = ({ color = '#a704f8' }) => {
  return (
    <div className={'spinnerContainer'}>
      <div className={'spinner'} style={{ borderColor: `${color} transparent` }}></div>
    </div>
  );
};

export default LoadingSpinner;
