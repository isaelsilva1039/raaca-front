'use client'
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import styled from 'styled-components';

// Definindo a interface para as props
interface CondicionalDisplayProps {
  text: any;
}

const CondicionalDasboard: React.FC<CondicionalDisplayProps> = ({ text }) => {

  const BlinkingText = styled('div')({
    '@keyframes blink': {
      '0%': { opacity: 1 },
      '50%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    animation: 'blink 1.5s infinite',
    color: 'InactiveBorder',
  });

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFFFFF',
      background: '#FFFFFF',
      height:'100%'
    }}>
      {/* <img src="https://viniciuspistori.com.br/assets/images/avatar-1200x1002.png" /> */}

      <img
        src={'https://viniciuspistori.com.br/assets/images/avatar-1200x1002.png'}
        alt="Avatar"
        style={{ width: '33%' }}
      />

      <Typography variant="h4" gutterBottom color={'GrayText'}>
        {/* Atenção! */}
      </Typography>
      <div style={{display:'flex', alignContent: 'center', justifyContent:'center' , height:'fit-content'}}>
        {text && (
          <Typography variant="subtitle1" color={'GrayText'} sx={{ mb: 3 }}>
            <BlinkingText style={{fontSize:22}}>{text}</BlinkingText>
          </Typography>
        )}
      </div>



    </Box>
  );
}


export default CondicionalDasboard;
