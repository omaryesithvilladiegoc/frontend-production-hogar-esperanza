"use client"
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

interface ParentComponentProps {
  children: ReactNode;
  color: string;
}

const ParentComponent: React.FC<ParentComponentProps> = ({ children, color }) => {
  const path = usePathname();
  const isBlogDetailPage = path.startsWith("/blog/");
  const backgroundColor = isBlogDetailPage ? "#041b13" : color;

  return (
    <div style={{ backgroundColor }}>
      {children}
    </div>
  );
};

export default ParentComponent;
