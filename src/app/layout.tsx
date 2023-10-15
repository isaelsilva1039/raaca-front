"use client"

import { Inter } from 'next/font/google'
import './style.css'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/core/infra/ports/react/componentes/sidebar/Sidebar'
import { MenuItem } from '@/core/infra/ports/react/componentes/menu/MenuItem'

const inter = Inter({ subsets: ['latin'] })

const menuItems = [
  {
    title: 'Dashboard',
    icone: './assets/rout-dashboard.svg',
    route: '/dashboard',
  },
  {
    title: 'Chaves Pix',
    icone: './assets/rout-chaves-pix.svg',
    route: '/chaves-Pix',
  },
  {
    title: 'Smart POS',
    icone: './assets/rout-smart-pos.svg',
    route: '/smart-pos',
  },
  {
    title: 'Gerenciador',
    icone: './assets/rout-gerenciadores.svg',
    route: '/gerenciador',
  },
  {
    title: 'Relatório',
    icone: './assets/rout-relatorios.svg',
    route: '/relatorio',
    color: '#4318FF',
  },
  {
    title: 'Operadores',
    icone: './assets/rout-operadores.svg',
    route: '/operadores',
  },
  {
    title: 'Grupo de acesso',
    icone: './assets/rout-grupos-acesso.svg',
    route: '/grupo-de-acesso',
  }
];

var open = false

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => {
      open = !prevIsOpen
      return !prevIsOpen
    })
  }

  const route = usePathname();

  useEffect(() => {
    if (route === '/')
      window.location.href = '/dashboard'
  }, []);

  const items = menuItems.map((item, index) => {
    const props = {
      chave: index,
      title: item.title,
      icone: item.icone,
      route: item.route,
      isActive: route === item.route,
    }

    return (
      <MenuItem {...props} />
    )
  })

  const title = route.replace('/', '');

  return getLayout({
    onClick: toggleMenu,
    title,
    items,
    isOpen,
    children,
  });
}

export const getLayout = (props: {
  onClick: () => void
  title: string
  items: JSX.Element[]
  isOpen: boolean
  children: React.ReactNode
}) => {
  return (
    <>
      <html className="h-screen w-screen">
        <body className={inter.className} style={{ background: "#EFF1F3" }}>
          <main>
            <div className="container">
              <Sidebar
                onClick={props.onClick}
                title={props.title}
                items={props.items}
                isOpen={props.isOpen}
              />
              <div className="content" onClick={() => { if (props.isOpen) props.onClick() }}>
                {props.children}
              </div>
            </div>
          </main>
        </body>
      </html>
    </>
  );
}