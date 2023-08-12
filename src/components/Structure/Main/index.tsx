'use client';
import React from 'react';
import { StyledMain } from './style';

interface IMain {
  children: React.ReactNode;
}
export default function Main({ children }: IMain) {
  return (
    <StyledMain className="flex flex-col flex-grow p-4 mb-8">
      {children}
    </StyledMain>
  );
}
