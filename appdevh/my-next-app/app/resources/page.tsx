"use client";

import Link from "next/link";
import { Home, Mail, BookOpen } from "lucide-react";

export default function Resources() {
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
          
          <h2 className="text-2xl font-bold text-gray-800 mt-8">Credits & Resources</h2>
          
          <div className="mt-8 space-y-6 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tools & Frameworks</h3>
              <ul className="space-y-2 ml-4">
                <li>🎨 <strong>Next.js</strong> - React Framework for production</li>
                <li>🎯 <strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
                <li>🎪 <strong>Lucide Icons</strong> - Beautiful & consistent icon library</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Inspiration</h3>
              <ul className="space-y-2 ml-4">
                <li>✨ Modern minimalist design principles</li>
                <li>♿ Web accessibility best practices</li>
                <li>📱 Mobile-responsive design</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resources</h3>
              <ul className="space-y-2 ml-4">
                <li><a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lucide Icons Documentation</a></li>
                <li><a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Next.js Documentation</a></li>
                <li><a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tailwind CSS Documentation</a></li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
