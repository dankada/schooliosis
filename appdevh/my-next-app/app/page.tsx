"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, Mail, BookOpen, X } from "lucide-react";
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

const CHAR_LIMIT = 200; // Characters before cutoff

export default function HomePage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<ContentItem | null>(null);

  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => setContentItems(data));
  }, []);

  const isTruncated = (content: string) => content.length > CHAR_LIMIT;
  const truncateText = (content: string) => content.substring(0, CHAR_LIMIT) + "...";

  const openBlogModal = (item: ContentItem) => {
    setSelectedBlog(item);
    setBlogModalOpen(true);
  };

  const closeBlogModal = () => {
    setBlogModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 left-0 right-0 bg-black shadow-lg py-4 px-8 z-20 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">My Profile</h1>
        <nav className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <Home size={20} />
            <span className="hidden sm:inline">Home</span>
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
          <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24 w-full max-w-xs hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setImageModalOpen(true)}
                className="relative cursor-pointer group"
              >
                <img 
                  src="/Screenshot 2026-01-21 155754.png" 
                  alt="profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Lloyd Joshua M. Matobato</h2>
                <p className="text-gray-600 font-medium">CS Student</p>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed">
                guh
              </p>

              <Divider />

              {/* Stats or Quick Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-bold text-blue-600">2.1 and a half</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-bold text-blue-600">0.2 decades</span>
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
            <h3 className="text-4xl font-bold text-gray-900 mb-12">Entries</h3>

            {/* Content Cards */}
            <div className="space-y-8">
              {contentItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => openBlogModal(item)}
                  className="hover:scale-105 transition-transform duration-300 cursor-pointer origin-center"
                >
                  <Card className="shadow-md hover:shadow-lg transition-shadow h-full">
                    <div className="p-8">
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-500 mb-4">{new Date(item.date).toLocaleDateString()}</p>
                      
                      {/* Content with gradient fade effect */}
                      <div className="relative mb-6">
                        <p className="text-gray-700 leading-relaxed">
                          {expandedId === item.id ? item.content : truncateText(item.content)}
                        </p>
                        {expandedId !== item.id && isTruncated(item.content) && (
                          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                        )}
                      </div>
                      
                      {/* Tags */}
                      <div className="flex gap-2 mb-6 flex-wrap">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More Button */}
                      {isTruncated(item.content) && (
                        <>
                          {expandedId !== item.id && (
                            <Button 
                              label="Read More" 
                              className="p-button-sm p-button-outlined"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedId(item.id);
                              }}
                            />
                          )}
                          {expandedId === item.id && (
                            <Button 
                              label="Show Less" 
                              className="p-button-sm p-button-outlined p-button-danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedId(null);
                              }}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </Card>
                </div>
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

      {/* Image Modal - Wikipedia style */}
      {imageModalOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setImageModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Image Container */}
            <div className="flex items-center justify-center bg-white p-8">
              <img 
                src="/Screenshot 2026-01-21 155754.png" 
                alt="profile full"
                className="max-w-full max-h-96 object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Blog Post Modal */}
      {blogModalOpen && selectedBlog && (
        <div 
          className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={closeBlogModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeBlogModal}
              className="sticky top-4 right-4 float-right bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors z-10 m-4"
            >
              <X size={24} />
            </button>

            {/* Blog Content */}
            <div className="p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{selectedBlog.title}</h2>
              <p className="text-sm text-gray-500 mb-6">{new Date(selectedBlog.date).toLocaleDateString()}</p>

              {/* Tags */}
              <div className="flex gap-2 mb-8 flex-wrap">
                {selectedBlog.tags.map((tag) => (
                  <span key={tag} className="text-sm bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <Divider />

              {/* Full Content */}
              <p className="text-lg text-gray-700 leading-relaxed mt-8">
                {selectedBlog.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}