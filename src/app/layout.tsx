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

const inter = Inter({ subsets: ["latin"] });

const menuItems = [
  {
    title: "Dashboard",
    icone: "./assets/rout-dashboard.svg",
    route: "/dashboard",
  },
  {
    title: "Clientes",
    icone: "./assets/rout-operadores.svg",
    route: "/clientes",
  },
  {
    title: "Agendamentos",
    icone: "./assets/rout-smart-pos.svg",
    route: "/agendamentos",
  },
  {
    title: "Profissionais",
    icone: "./assets/rout-gerenciadores.svg",
    route: "/cadastro-profissionais",
  },
  {
    title: "Relatório",
    icone: "./assets/rout-relatorios.svg",
    route: "/relatorio",
    color: "#4318FF",
  },
  {
    title: "Operadores",
    icone: "./assets/rout-operadores.svg",
    route: "/operadores",
  },
  {
    title: "Grupo de acesso",
    icone: "./assets/rout-grupos-acesso.svg",
    route: "/grupo-de-acesso",
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
  // Determina se o usuário está na tela de login
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
      isActive: route === item.route,
    };

    return <MenuItem {...props} key={index} />;
  });

  const title = route.replace("/", "");

  return getLayout({
    onClick: toggleMenu,
    title,
    items,
    isOpen,
    children,
    isLogin,
  });
}

export const getLayout = (props: {
  onClick: () => void;
  title: string;
  items: JSX.Element[];
  isOpen: boolean;
  children: React.ReactNode;
  isLogin: any;
}) => {
  const classLogin = props.isLogin ? "content-login" : "content";

  const handleLogout = () => {
    // Limpar localStorage
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <>
      <html className="h-screen w-screen">
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
                {!props.isLogin && (
                  <div className="barra-menu">
                    <a className="barra-menu-btn" onClick={() => handleLogout()}>
                      Logout
                      <IoExitOutline />
                    </a>
                  </div>
                )}

                {props.children}
              </div>
            </div>
          </main>
        </body>
      </html>
    </>
  );
};
