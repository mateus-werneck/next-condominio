'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface IMain {
  children: React.ReactNode;
}
export default function Main({ children }: IMain) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main
        className="flex flex-col flex-grow p-4 mb-8 ml-4 min-h-screen"
        id="main-root"
      >
        {children}
      </main>
    </QueryClientProvider>
  );
}
