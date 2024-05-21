
import React from "react";
import './styles.css';

import { Doctor } from "./types";

interface DoctorCardProps {
  doctor: Doctor;
  onMedicoSelec: any; 
  idSelect: any
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onMedicoSelec, idSelect }) => {
  const cardClass = `cardContainer ${idSelect === doctor?.user_id ? 'selected' : ''}`;

  return (
    <div className={cardClass} onClick={() => onMedicoSelec(doctor?.user_id)}>
      <img
        src={doctor?.avatarUrl}
        alt={doctor?.nome}
        className={'avatar'}
      />
      <div className={'details'}>
        <text className={'name'}>{doctor?.nome}</text>
        <small className={'specialty'}>{doctor?.especialidade}</small>
      </div>
    </div>
  );
};

export default DoctorCard;
