import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

const AgendamentosSkeleton: React.FC = () => {
  return (
    <div className="container">
      <Typography
        sx={{
          color: "#707EAE",
          fontWeight: "500",
          lineHeight: "24px",
          fontSize: "15px",
          marginBottom: 2
        }}
      >

      </Typography>
      <div className="container-page">
        <div className="menu-profissionais">
          <div className="card-lista-prof">
          <Skeleton variant="text" width="100%" height={20} />
          </div>
          {Array.from(new Array(10)).map((_, index) => (
            <Skeleton key={index} variant="rounded" width="100%" height={60} sx={{ marginBottom: 1 }} />
          ))}
        </div>
        <div className="calendario" style={{display:'flex', padding:'10px'}}>
          <Skeleton variant="rounded" width="100%" height={'90%'} />
        </div>
      </div>
    </div>
  );
};

export default AgendamentosSkeleton;
