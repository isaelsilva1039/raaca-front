"use client";

import { Inter } from "next/font/google";
import "./style.css";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/core/infra/ports/react/componentes/sidebar/Sidebar";
import { MenuItem } from "@/core/infra/ports/react/componentes/menu/menuItem";
import { Toaster } from "react-hot-toast";
import { AuthGuard } from "@/core/helpes/withAuth";
import { IoExitOutline } from "react-icons/io5";
import { UserProvider } from "@/core/helpes/UserContext";
import { LiaUserClockSolid } from "react-icons/lia";
import Perfil from "./perfil/page";
import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });

const menuItems = [
  {
    title: "Dashboard",
    icone: "./assets/rout-dashboard.svg",
    route: "/dashboard",
    allowedTypes: [1, 2, 3, 4]
  },
  {
    title: "Clientes",
    icone: "./assets/rout-operadores.svg",
    route: "/clientes",
    allowedTypes: [1] 

  },
  {
    title: "Agendamentos",
    icone: "./assets/rout-smart-pos.svg",
    route: "/agendamentos",
    allowedTypes: [1, 2, 3, 4]

  },
  {
    title: "Configurar agenda",
    icone: "./assets/rout-grupos-acesso.svg",
    route: "/meus-horario",
    allowedTypes: [2]

  },
  {
    title: "Profissionais",
    icone: "./assets/rout-gerenciadores.svg",
    route: "/cadastro-profissionais",
    allowedTypes: [1]  // Todos os tipos de usuários

  },
  {
    title: "Relatório",
    icone: "./assets/rout-relatorios.svg",
    route: "/relatorio",
    color: "#4318FF",
    allowedTypes: [1]  // Todos os tipos de usuários

  },
  {
    title: "Operadores",
    icone: "./assets/rout-operadores.svg",
    route: "/operadores",
    allowedTypes: [1]  // Todos os tipos de usuários

  },
  {
    title: "Grupo de acesso",
    icone: "./assets/rout-grupos-acesso.svg",
    route: "/grupo-de-acesso",
    allowedTypes: [1]  // Todos os tipos de usuários

  },
];

var open = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => {
      open = !prevIsOpen;
      return !prevIsOpen;
    });
  };

  const route = usePathname();
  const isLogin = route === "/" || route === "/login";

  useEffect(() => {
    if (route === "/") window.location.href = "/login";
  }, [route]);


  const items = menuItems.map((item, index) => {
    const props = {
      chave: index,
      title: item.title,
      icone: item.icone,
      route: item.route,
      allowedTypes: item.allowedTypes,
      isActive: route === item.route,
    };

    // Mover a chave para o componente mais externo dentro do map
    return <UserProvider key={index}>
              <MenuItem {...props} />
           </UserProvider>;
  });


  const title = route.replace("/", "");

  return layout({
    onClick: toggleMenu,
    title,
    items,
    isOpen,
    children,
    isLogin,
  });
}

export const layout = (props: {
  onClick: () => void;
  title: string;
  items: JSX.Element[];
  isOpen: boolean;
  children: React.ReactNode;
  isLogin: any;
}) => {

  const classLogin = props.isLogin ? "content-login" : "content";

  return (
    <UserProvider>
    <>
      <html className="h-screen w-screen">
        <head>
          <link rel="icon" href="https://raccasaude.com.br/wp-content/uploads/2023/11/sem-fundo-simbolo-01-100x100.png" />
          <title>Racca Saude</title>
        </head>
        <body className={inter.className} style={{ background: "#EFF1F3" }}>
          <main>
            <div className="container">
              {!props.isLogin && (
                <AuthGuard load={false}>
                  <Sidebar
                    onClick={props.onClick}
                    title={props.title}
                    items={props.items}
                    isOpen={props.isOpen}
                  />
                </AuthGuard>
              )}

              <div
                className={classLogin}
                onClick={() => {
                  if (props.isOpen) props.onClick();
                }}
              >
                {/* {!props.isLogin && (
                  <div className="barra-menu">
                    <a><Perfil /></a>
                  </div>
                )} */}
                
                {props.children}
              </div>
            </div>
          </main>
        </body>
      </html>
    </>
    </UserProvider>
  );
};
