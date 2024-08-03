// src/app/layout.tsx

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
import { FaTachometerAlt, FaUser, FaCalendarAlt, FaCog, FaUsers, FaClipboardList, FaFileAlt, FaTools } from 'react-icons/fa';
import Head from "next/head";
import { BiSolidMegaphone } from "react-icons/bi";


const inter = Inter({ subsets: ["latin"] });

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaTachometerAlt color="#a3aed0" size={20} />,
    route: "/dashboard",
    allowedTypes: [1, 2, 3, 4]
  },
  {
    title: "Clientes",
    icon: <FaUser color="#a3aed0" size={20} />,
    route: "/clientes",
    allowedTypes: [1]
  },
  {
    title: "Agendamentos",
    icon: <FaCalendarAlt color="#a3aed0" size={20} />,
    route: "/agendamentos",
    allowedTypes: [1, 2, 3, 4]
  },
  {
    title: "Configurar agenda",
    icon: <FaCog color="#a3aed0" size={20} />,
    route: "/meus-horario",
    allowedTypes: [2]
  },
  {
    title: "Profissionais",
    icon: <FaUsers color="#a3aed0" size={20} />,
    route: "/cadastro-profissionais",
    allowedTypes: [1]
  },
  {
    title: "Planos",
    icon: <FaClipboardList color="#a3aed0" size={20} />,
    route: "/planos",
    allowedTypes: [1]
  },
  {
    title: "Especialidades",
    icon: <FaClipboardList color="#a3aed0" size={20} />,
    route: "/cadastro-especialidades",
    allowedTypes: [1]
  },
  {
    title: "Relatório",
    icon: <FaFileAlt  color="#a3aed0" size={20} />,
    route: "/relatorio",
    color: "#4318FF",
    allowedTypes: [1]
  },
  {
    title: "Operadores",
    icon: <FaUser color="#a3aed0" size={20} />,
    route: "/operadores",
    allowedTypes: [1]
  },
  {
    title: "Grupo de acesso",
    icon: <FaTools  color="#a3aed0" size={20} />,
    route: "/grupo-de-acesso",
    allowedTypes: [1]
  },
  {
    title: "Chamados",
    icon: <BiSolidMegaphone  color="#a3aed0" size={20} />,
    route: "/chamados",
    allowedTypes: [1,2,3,4]
  },
];

var open = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
      icon: item.icon,
      route: item.route,
      allowedTypes: item.allowedTypes,
      isActive: route === item.route,
    };

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
        <Head>
          <link rel="icon" href="https://raccasaude.com.br/wp-content/uploads/2023/11/sem-fundo-simbolo-01-100x100.png" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <meta name="theme-color" content="#000000" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <title>Racca Saúde</title>
        </Head>
        <html lang="en" className="h-screen w-screen">
          <body className={`${inter.className} h-screen w-screen`} style={{ background: "#EFF1F3" }}>
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
