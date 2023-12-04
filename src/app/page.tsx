import React, { ReactNode } from 'react';
import Header from '@/slices/Header';
import MainBlock from '@/slices/Posts';

export default async function Home() {
  return (
    <main className="w-full flex flex-col">
      <Header />
      <MainBlock />
    </main>
  );
}
