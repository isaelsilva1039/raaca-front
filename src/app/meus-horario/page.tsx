'use client'

import { useState } from 'react';

import { isAvailable,isHoliday } from '@/utils/scheduleUtils';
import { Typography } from '@mui/material';

import './styles.css'

const BookAppointment: React.FC = () => {
    return (
        <div className="container">
    
          <Typography
            className="list-top"
            sx={{
              color: "#707EAE",
              fontWeight: "500",
              lineHeight: "24px",
              fontSize: "15px",
            }}
          >
            Menu / Meus horarios
          </Typography>
    
          <div className="container-page">
            aaaa
          </div>
        </div>
      );
    }
export default BookAppointment;
