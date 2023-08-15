'use client';
import React from 'react';

interface IMain {
  children: React.ReactNode;
}
export default function Main({ children }: IMain) {
  return (
    <main className="flex flex-col flex-grow p-4 mb-8 min-h-screen">
      {children}
    </main>
  );
}
