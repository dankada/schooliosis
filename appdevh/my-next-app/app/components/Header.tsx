"use client";

import Link from "next/link";
import { Home, Mail, BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 bg-black shadow-lg py-4 px-8 z-20 flex items-center justify-between">
      <h1 className="text-xl font-bold text-white">My Profile</h1>
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
  );
}