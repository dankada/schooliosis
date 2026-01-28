"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, Mail, BookOpen } from "lucide-react";
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

interface ContentItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
}

export default function HomePage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => setContentItems(data));
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Sticky Header */}
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

      <div className="flex min-h-screen pt-20">
        {/* Left Sidebar - Profile */}
        <div className="w-1/4 px-6 py-8 flex items-start justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24 w-full max-w-xs">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <img 
                src="https://via.placeholder.com/200x200?text=Your+Photo" 
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
              />
            </div>

            {/* Profile Info */}
            <div className="text-center space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Name</h2>
                <p className="text-gray-600 font-medium">Full Stack Developer</p>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed">
                Passionate about creating beautiful and functional web applications. Always learning and exploring new technologies.
              </p>

              <Divider />

              {/* Stats or Quick Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-bold text-blue-600">15+</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-bold text-blue-600">3+ years</span>
                </div>
              </div>

              <Divider />

              {/* Social Links */}
              <div className="space-y-2">
                <Link href="/contact" className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Contact Me
                </Link>
                <Link href="/resources" className="block w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                  View Work
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Center Content Area - Cards */}
        <div className="w-1/2 px-8 py-8 flex justify-center">
          <div className="w-full max-w-2xl">
            <h3 className="text-4xl font-bold text-gray-900 mb-12">Introduction</h3>

            {/* Content Cards */}
            <div className="space-y-8">
              {contentItems.map((item) => (
                <Card key={item.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 mb-4">{new Date(item.date).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {expandedId === item.id ? item.content : item.excerpt}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex gap-2 mb-6 flex-wrap">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    {expandedId !== item.id && (
                      <Button 
                        label="Read More" 
                        className="p-button-sm p-button-outlined"
                        onClick={() => setExpandedId(item.id)}
                      />
                    )}
                    {expandedId === item.id && (
                      <Button 
                        label="Show Less" 
                        className="p-button-sm p-button-outlined p-button-danger"
                        onClick={() => setExpandedId(null)}
                      />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Empty for now */}
        <div className="w-1/4 px-6 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
            <p className="text-gray-500 text-center">Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}