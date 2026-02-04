"use client";

import { Mail, Github, Twitter, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [mounted, setMounted] = useState(false);

  useState(() => {
    setMounted(true);
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className={`${mounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Let's Connect</h1>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              Feel free to reach out through any of these channels. I'm always open to 
              interesting conversations and collaboration opportunities.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            <a
              href="mailto:josh.breve@gmail.com"
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 card-hover group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--hover-bg)] rounded-lg group-hover:bg-[var(--accent)] transition-colors">
                  <Mail size={24} className="group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-sm text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                    josh.breve@gmail.com
                  </p>
                </div>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/dankada"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 card-hover group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--hover-bg)] rounded-lg group-hover:bg-[var(--accent)] transition-colors">
                  <Github size={24} className="group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">GitHub</h3>
                  <p className="text-sm text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                    @dankada
                  </p>
                </div>
              </div>
            </a>

            {/* Twitter Card */}
            <a
              href="https://twitter.com/llshua"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 card-hover group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--hover-bg)] rounded-lg group-hover:bg-[var(--accent)] transition-colors">
                  <Twitter size={24} className="group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Twitter</h3>
                  <p className="text-sm text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                    @llshua
                  </p>
                </div>
              </div>
            </a>

            {/* Location Card */}
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--hover-bg)] rounded-lg">
                  <MapPin size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-[var(--muted)]">
                    Davao, Philippines
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center">
            <Send size={32} className="mx-auto mb-4 text-[var(--accent)]" />
            <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
            <p className="text-[var(--muted)] max-w-xl mx-auto">
              I typically respond within 24-48 hours. For urgent matters, 
              Twitter DMs are usually the fastest way to reach me.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
