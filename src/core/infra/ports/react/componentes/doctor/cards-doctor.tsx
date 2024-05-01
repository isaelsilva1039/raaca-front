
import React from "react";
import './styles.css';

import { Doctor } from "./types";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className={'cardContainer'}>
      <img
        src={doctor.avatarUrl}
        alt={doctor.nome}
        className={'avatar'}
      />
      <div className={'details'}>
        <text className={'name'}>{doctor.nome}</text>
        <small className={'specialty'}>{doctor.especialidade}</small>
      </div>
    </div>
  );
};

export default DoctorCard;
