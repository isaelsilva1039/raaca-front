import DoctorCard from "@/core/infra/ports/react/componentes/doctor/cards-doctor";
import { Doctor } from "@/core/infra/ports/react/componentes/doctor/types";
import { Typography } from "@mui/material";
import './styles.css'
import CalendarComponent from "@/core/infra/ports/react/componentes/calendario/CalendarComponent";
import { Container } from "postcss";

export default function SmartsPOS() {
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Jane Doe",
      specialty: "Cardiologist",
      avatarUrl: "https://randomuser.me/api/portraits/women/81.jpg",
    },
    {
      id: 2,
      name: "Dr. John Smith",
      specialty: "Dermatologist",
      avatarUrl: "https://randomuser.me/api/portraits/men/82.jpg",
    },
    {
      id: 3,
      name: "Dr. Marcio",
      specialty: "Dermatologist",
      avatarUrl: "https://randomuser.me/api/portraits/men/83.jpg",
    },
    {
      id: 4,
      name: "Dr. Marcio",
      specialty: "Dermatologist",
      avatarUrl: "https://randomuser.me/api/portraits/men/84.jpg",
    },
    {
      id: 5,
      name: "Dr. Marcio",
      specialty: "Dermatologist",
      avatarUrl: "https://randomuser.me/api/portraits/men/85.jpg",
    },
    {
      id: 6,
      name: "Dr. Marcio",
      specialty: "Dermatologist",
      avatarUrl: "https://randomuser.me/api/portraits/men/86.jpg",
    },

    {
      id: 7,
      name: "Dr. Marcio",
      specialty: "Dermatologist",
      avatarUrl: "https://randomuser.me/api/portraits/men/87.jpg",
    },

    {
      id: 8,
      name: "Dr. Marcio",
      specialty: "Dermatologist",
      avatarUrl: "https://randomuser.me/api/portraits/men/88.jpg",
    },

    {
      id: 9,
      name: "Dr. Marcio",
      specialty: "Dermatologist",
      avatarUrl: "https://randomuser.me/api/portraits/men/89.jpg",
    },

    {
      id: 10,
      name: "Dr. Marcio",
      specialty: "Dermatologist",
      avatarUrl: "https://randomuser.me/api/portraits/men/90.jpg",
    },

    {
      id: 11,
      name: "Dr. Marcio",
      specialty: "Dermatologist",
      avatarUrl: "https://randomuser.me/api/portraits/men/91.jpg",
    },
    // Adicione mais médicos conforme necessário
  ];

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
        Menu / Agendamentos
      </Typography>

      <div className="container-page">
      
        <div className="menu-profissionais">
        <div className="card-lista-prof">
          <text className="text-item">
            Lista de profissionais
          </text>
        
        </div>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
        <div className="calendario">
           <CalendarComponent />

        </div>
      </div>
    </div>
  );
}
