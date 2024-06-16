"use client";
import React, { useEffect, useState } from "react";
import SpecialtyForm from "./especialidadeForm";
import SpecialtyList from "./listaEspecialidades";
import { Typography } from "@mui/material";
import { deleteEspecialidades, getEspecialidades, postEspecialidades, putEspecialidades } from "../api/especialidade/especialidades";
import { useCliente } from "@/core/helpes/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Specialty {
  id: number;
  description: string;
  duration: string;
}

const Home: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const [editData, setEditData] = useState<Specialty | null>(null);
  const [onUpdateNew, setOnUpdateNew] = useState<boolean>(false);
  
  const { token, user } = useCliente();
  const handleSubmit = (specialty: Specialty) => {

    const newSpecialty: Specialty = {
      id: nextId,
      description: specialty.description,
      duration: specialty.duration,
    };


    if (editData) {
      const updatedSpecialties = specialties.map((item) =>
        item.id === specialty.id ? { ...specialty } : item
      );
      setSpecialties(updatedSpecialties);
      setEditData(null);


      putEspecialidades(
        specialty.id,
        specialty.description,
        token,
        (data) => {
          setOnUpdateNew(true)
          pushNotify("success", "Success", "Especialidade editado!");
        },
        (error)=>{
          setOnUpdateNew(false)
          pushNotify("error", "Error", "Aconteceu um erro!");
        },
      )
      setOnUpdateNew(false)

    } else {
      
      postEspecialidades(
        newSpecialty?.description,
        token,
        (data) => {
          setOnUpdateNew(true)
          pushNotify("success", "Success", "Especialidade adicionada!");
        },
        (error)=>{
          setOnUpdateNew(false)
          pushNotify("error", "Error", "Aconteceu um erro!");
        },
      )
      setOnUpdateNew(false)
    }
  };


  const pushNotify = (
    status: "success" | "error" | "info",
    title: string,
    text: string
  ) => {
    toast[status](text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: status,
      className: "notify-custom-margin", // Adiciona a classe CSS personalizada
    });
  };
  
  const handleDelete = (id: number) => {
   

      deleteEspecialidades(
        id,
        token,
        (data) => {
          setOnUpdateNew(true)
          pushNotify("success", "Success", "Especialidade excluida!");
        },
        (error)=>{
          setOnUpdateNew(false)
          pushNotify("error", "Error", "Aconteceu um erro!");
        },
      )
      setOnUpdateNew(false)

  };

  const handleEdit = (specialty: Specialty) => {
    setEditData(specialty);

  };

  const handleCancel = () => {
    setEditData(null);
  };



  return (
    <>
      <Typography
        sx={{
          color: "#707EAE",
          fontWeight: "500",
          lineHeight: "24px",
          fontSize: "15px",
          padding: "12px 0 32px 0px",
        }}
      >
        Menu / Especialidades
      </Typography>
        <ToastContainer />
      <div className="conatiner">
        <SpecialtyForm
          onSubmit={handleSubmit}
          initialData={editData}
          onCancel={handleCancel}
        />
        <SpecialtyList
          specialties={specialties}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onUpdateNew={onUpdateNew}
        />
      </div>
    </>
  );
};

export default Home;
