"use client";

import Link from "next/link";
import { Home, Mail, BookOpen } from "lucide-react";

export default function Contact() {
  const bgImageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBO3rKg67dFf6OZ1otSZppUGwUyYSDVuww6xspsEc-OHvT2P6O4sG6C5pVpV0wJe20dPsfR1KDnEMYQiDjtWYzzOisFB3LCHVXGp9VE17T7oYWdDocvXCX_UHqkSC5SFtkxmjJbAHpVmFs/s800/small_star2_skyblue.png";

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Texture Background Layer */}
      <div 
        className="fixed inset-0 -z-10 opacity-20 grayscale pointer-events-none"
        style={{ 
          backgroundImage: `url(${bgImageUrl})`,
            backgroundSize: '120px 120px',
            backgroundRepeat: 'repeat' 
          }}
          />
          {/* Sticky Header */}
          <header className="sticky top-0 left-0 right-0 bg-black shadow-lg py-4 px-8 z-20 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Welcome</h1>
          <nav className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
              <Home size={20} />
              <span className="hidden sm:inline">Introduction</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
              <Mail size={20} />
              <span className="hidden sm:inline">Contact</span>
            </Link>
            <Link href="/resources" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
              <BookOpen size={20} />
              <span className="hidden sm:inline">Resources</span>
            </Link>
          </nav>
          </header>

      <div className="flex min-h-screen items-center justify-center font-sans">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8">Contact & Social Media</h2>
          
          <div className="mt-8 space-y-4 text-gray-700">
            <p className="text-lg">Feel free to reach out to me through the following channels:</p>
            <ul className="space-y-3 ml-4">
              <li>📧 <strong>Email:</strong> your.email@example.com</li>
              <li>🐙 <strong>GitHub:</strong> <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/yourprofile</a></li>
              <li>💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/yourprofile</a></li>
              <li>𝕏 <strong>Twitter:</strong> <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">twitter.com/yourprofile</a></li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
