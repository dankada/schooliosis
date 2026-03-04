"use client";

import { Code, Palette, Wrench, ExternalLink, Heart } from "lucide-react";
import { useState } from "react";

export default function Resources() {
  const [mounted, setMounted] = useState(false);

  useState(() => {
    setMounted(true);
  });

  const tools = [
    {
      name: "Next.js",
      description: "React framework for production",
      link: "https://nextjs.org/",
      icon: Code
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework",
      link: "https://tailwindcss.com/",
      icon: Palette
    },
    {
      name: "Lucide Icons",
      description: "Beautiful & consistent icon library",
      link: "https://lucide.dev/",
      icon: Heart
    },
    {
      name: "YouTube API",
      description: "Video content integration",
      link: "https://developers.google.com/youtube/v3/docs",
      icon: Wrench
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className={`${mounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Resources & Credits</h1>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              This project was built with amazing open-source tools and frameworks. 
              Here's what powers this site.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <a
                  key={tool.name}
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 card-hover group animate-fadeInUp stagger-${index + 1}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[var(--hover-bg)] rounded-lg group-hover:bg-[var(--accent)] transition-colors">
                      <Icon size={24} className="group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{tool.name}</h3>
                        <ExternalLink size={14} className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
                      </div>
                      <p className="text-sm text-[var(--muted)]">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Tech Stack */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Code size={24} className="text-[var(--accent)]" />
              Full Tech Stack
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Frontend */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--accent)] mb-3">Frontend</h3>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  <li>• React 18</li>
                  <li>• Next.js 14</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>

              {/* UI Libraries */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--accent)] mb-3">UI & Icons</h3>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  <li>• PrimeReact</li>
                  <li>• Lucide Icons</li>
                  <li>• Framer Motion</li>
                  <li>• Custom CSS</li>
                </ul>
              </div>

              {/* Integrations */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--accent)] mb-3">Integrations</h3>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  <li>• YouTube API</li>
                  <li>• Google Fonts</li>
                  <li>• Vercel Hosting</li>
                  <li>• Git & GitHub</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
              <Heart size={16} className="text-[var(--accent)]" />
              <span className="text-sm text-[var(--muted)]">
                Built with passion and caffeine
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
