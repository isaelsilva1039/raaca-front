"use client";
import React, { FC, useState } from 'react';
import { MenuItem } from './menuItem';
import { FoldersFolderKey } from './icons/FoldersFolderKey';
import { InterfaceEssentialBlackboardBusinessChart11 } from './icons/InterfaceEssentialBlackboardBusinessChart11';
import { MoneyCoinsDocumentChart } from './icons/MoneyCoinsDocumentChart';
import { PaymentsFinanceCardReaderCreditCard1 } from './icons/PaymentsFinanceCardReaderCreditCard1';
import { ProtectionSecurityComputerLockCheckmark } from './icons/ProtectionSecurityComputerLockCheckmark';
import { ProtectionSecurityLockProtectionFastCircle1 } from './icons/ProtectionSecurityLockProtectionFastCircle1';
import { UserGroupUser } from './icons/UserGroupUser';
import './styles/stilos.css';
import { usePathname } from 'next/navigation';

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

export const SidebarNotification: FC = () => {

  const route = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="sidebar-container">
      <button id="menu-btn" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`sidebar-notification ${isOpen ? 'open' : ''}`}>
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
          <div className="text">
            <p className="swift-pay">
              <span className="span">Swift</span>
              <span className="text-wrapper-2">Pay</span>
            </p>
          </div>
        </div>
        <div className="separator" />
      </div>
    </div>
  );
};
