"use client"
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

interface ParentComponentProps {
  children: ReactNode;
  color: string;
}

const ParentComponent: React.FC<ParentComponentProps> = ({ children, color }) => {
  const path = usePathname();
  if (path === "/") {
    
  }
    return (
    <div className={path.includes("/blog") ? `bg-[${color}]` :"bg-white"}>
      {children}
    </div>
  );
};

export default ParentComponent;
