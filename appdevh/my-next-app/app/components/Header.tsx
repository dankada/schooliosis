"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mail, BookOpen, Github, Twitter } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 left-0 right-0 glass z-50 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center font-bold text-white transition-transform group-hover:scale-110">
              LM
            </div>
            <span className="text-lg font-semibold hidden sm:block">Lloyd Matobato</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link 
              href="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                isActive('/') 
                  ? 'bg-[var(--hover-bg)] text-[var(--foreground)]' 
                  : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--hover-bg)]'
              }`}
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link 
              href="/contact" 
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                isActive('/contact') 
                  ? 'bg-[var(--hover-bg)] text-[var(--foreground)]' 
                  : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--hover-bg)]'
              }`}
            >
              <Mail size={18} />
              <span className="hidden sm:inline">Contact</span>
            </Link>
            
            <Link 
              href="/resources" 
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                isActive('/resources') 
                  ? 'bg-[var(--hover-bg)] text-[var(--foreground)]' 
                  : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--hover-bg)]'
              }`}
            >
              <BookOpen size={18} />
              <span className="hidden sm:inline">Resources</span>
            </Link>

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-[var(--border)]">
              <a 
                href="https://github.com/dankada" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--hover-bg)] transition-all"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://twitter.com/llshua" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--hover-bg)] transition-all"
              >
                <Twitter size={18} />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
