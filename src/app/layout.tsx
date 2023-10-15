"use client"

import { Inter } from 'next/font/google'
import '@/core/infra/ports/react/componentes/menu/styles/stilos.css'
import React, { FC, useEffect, useState } from 'react'
import { FoldersFolderKey } from '@/core/infra/ports/react/componentes/menu/icons/FoldersFolderKey'
import { InterfaceEssentialBlackboardBusinessChart11 } from '@/core/infra/ports/react/componentes/menu/icons/InterfaceEssentialBlackboardBusinessChart11'
import { MoneyCoinsDocumentChart } from '@/core/infra/ports/react/componentes/menu/icons/MoneyCoinsDocumentChart'
import { PaymentsFinanceCardReaderCreditCard1 } from '@/core/infra/ports/react/componentes/menu/icons/PaymentsFinanceCardReaderCreditCard1'
import { ProtectionSecurityComputerLockCheckmark } from '@/core/infra/ports/react/componentes/menu/icons/ProtectionSecurityComputerLockCheckmark'
import { ProtectionSecurityLockProtectionFastCircle1 } from '@/core/infra/ports/react/componentes/menu/icons/ProtectionSecurityLockProtectionFastCircle1'
import { UserGroupUser } from '@/core/infra/ports/react/componentes/menu/icons/UserGroupUser'
import { usePathname } from 'next/navigation'
import { MenuItem } from "@/core/infra/ports/react/componentes/menu/menuItem";

const inter = Inter({ subsets: ['latin'] })

const menuItems = [
  {
    title: 'Dashboard',
    IconComponent: InterfaceEssentialBlackboardBusinessChart11,
    route: '/dashboard',
  },
  {
    title: 'Relatório',
    IconComponent: MoneyCoinsDocumentChart,
    route: '/relatorio',
    color: '#4318FF',
  },
  {
    title: 'Grupo de acesso',
    IconComponent: ProtectionSecurityLockProtectionFastCircle1,
    route: '/grupo-de-acesso',
  },
  {
    title: 'Operadores',
    IconComponent: UserGroupUser,
    route: '/operadores',
  },
  {
    title: 'Gerenciador',
    IconComponent: ProtectionSecurityComputerLockCheckmark,
    route: '/gerenciador',
  },
  {
    title: 'Smart POS',
    IconComponent: PaymentsFinanceCardReaderCreditCard1,
    route: '/smart-pos',
  },
  {
    title: 'Chaves Pix',
    IconComponent: FoldersFolderKey,
    route: '/chaves-Pix',
  },
];

var open = false

const SidebarNotification: FC = () => {

  const route = usePathname();

  return (
    <div className="sidebar-container">
      <div className={`sidebar-notification ${open ? 'open' : ''}`}>
        <div className="pages">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              IconComponent={item.IconComponent}
              route={item.route}
              isActive={route === item.route}
            />
          ))}
        </div>
        <div className="logo">
          <img className="img" src="./assets/logo.svg" alt="SwiftPay" />
        </div>
        <div className="separator" />
      </div>
    </div>
  )
}

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

  return (
    <html className="h-screen w-screen">
      <body className={inter.className} style={{ background: "#EFF1F3" }}>
        <main className='w-full h-full bg-[#EFF1F3]'>
          <div className="container">
            <SidebarNotification />
            <button id="menu-btn" onClick={toggleMenu}>
              ☰<span className="title">{route.replace('/', '')}</span>
            </button>
            <div className="content" onClick={() => {
              if (isOpen) toggleMenu()
            }}>{children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}