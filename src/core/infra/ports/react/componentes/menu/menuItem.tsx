import Link from 'next/link'
import React, { FC } from 'react'

interface MenuItemProps {
  title: string
  IconComponent: FC<{ className: string, color?: string }>
  isActive?: boolean
  color?: string
  route: string
}

export const MenuItem: FC<MenuItemProps> = ({ title, IconComponent, isActive = false, route }) => {

  let colorTitle = isActive ? '#2B3674' : '#A3AED0'
  let color = isActive ? '#4318FF' : '#A3AED0'

  return (
    <Link href={route}>
      <div className="menu-item">
        <div className="pagetitle" style={{ color: colorTitle }}>{title}</div>
        <IconComponent className="icon-instance-node-2" color={color} />
        {isActive && <div className="active" />}
      </div>
    </Link>
  )
}
