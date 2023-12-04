import React from 'react';
import Header from '@/slices/Header';

export default async function Home() {
  return (
    <main className="w-full flex">
      <Header />
      <Posts />
    </main>
  );
}
