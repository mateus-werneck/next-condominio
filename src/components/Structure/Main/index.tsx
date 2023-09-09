'use client';
import React from 'react';
import Breadcrumb from '../Breadcrumb';

interface IMain {
  children: React.ReactNode;
}
export default function Main({ children }: IMain) {
  return (
    <main
      className="flex flex-col flex-grow p-4 mb-8 min-h-screen"
      id="main-root"
    >
      <Breadcrumb />
      {children}
    </main>
  );
}
