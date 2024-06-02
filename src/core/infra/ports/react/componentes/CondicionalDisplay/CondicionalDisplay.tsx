import React from 'react';
import { Typography, Box, Button } from '@mui/material';

// Definindo a interface para as props
interface CondicionalDisplayProps {
  isAtingido: boolean;
  isPrazoPassado: boolean;
  isLiberdo: boolean;
}

const CondicionalDisplay: React.FC<CondicionalDisplayProps> = ({ isAtingido, isPrazoPassado, isLiberdo }) => {

    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFFFFF',
        background:'#FFFFFF',
      }}>
     
    
        <img
          src={'https://img.freepik.com/vetores-gratis/mao-desenhada-sem-ilustracao-de-dados_23-2150624582.jpg?w=740&t=st=1717088058~exp=1717088658~hmac=99b923ee556b27c354108b9f5e135dbc294bed2df61f9bca29830eae75c8adb9'}
          alt="Avatar"
          style={{ width: '30%'}}
        />
        
        <Typography variant="h4" gutterBottom color={'GrayText'}>
          Atenção!
        </Typography>
        
        {!isLiberdo && (
            <Typography variant="subtitle1" color={'GrayText'} sx={{ mb: 3 }}>
                Usuario não liberado para marcar consultas.
            </Typography>   
        )}

        {/* Condicional para exibir a mensagem sobre a quantidade de consultas */}
        {isAtingido && isLiberdo && (
          <Typography variant="subtitle1" color={'GrayText'} sx={{ mb: 3 }}>
            Você já realizou todas as consultas que seu plano atual permite.
          </Typography>
        )}
        
        {/* Condicional para exibir a mensagem sobre o prazo das consultas */}
        {isPrazoPassado && isLiberdo && (
          <Typography variant="subtitle1" color={'GrayText'} sx={{ mb: 3 }}>
            O prazo para realizar as consultas expirou.
          </Typography>
        )}
      </Box>
    );
  }


export default CondicionalDisplay;
