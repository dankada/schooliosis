"use client";

import Image from "next/image";
import { useState } from 'react';

export default function Home() {
  const [fact, setFact] = useState('');

  const facts = [
    'Hololive members speak multiple languages',
    'Virtual idols can stream for hours',
    'Hololive started in 2017',
    'Members collaborate across regions',
    'Virtual talents have millions of fans'
  ];

  const showRandomFact = () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setFact(randomFact);
  };

  return (
    <div className="page-wrapper">
      <div className="texture-bg" />
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        
        <button 
          onClick={showRandomFact}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Random Hololive Fact
        </button>

        <div className="flex justify-center mt-8">
            <Image
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBO3rKg67dFf6OZ1otSZppUGwUyYSDVuww6xspsEc-OHvT2P6O4sG6C5pVpV0wJe20dPsfR1KDnEMYQiDjtWYzzOisFB3LCHVXGp9VE17T7oYWdDocvXCX_UHqkSC5SFtkxmjJbAHpVmFs/s800/small_star2_skyblue.png"
              alt="Hololive"
              width={300}
              height={300}
              className="rounded"
            />
        </div>
        {fact && <p className="mt-2 text-black">{fact}</p>}
        
        
      </main>
    </div>
    </div>
  );
}
