"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, Calendar, Code, Coffee, ExternalLink, ChevronRight, X } from "lucide-react";
import { Divider } from 'primereact/divider';
import BlogImageGallery from "./components/BlogImageGallery";

interface ContentItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  images?: string[];
}

const CHAR_LIMIT = 200;
const YOUTUBE_API_KEY = "AIzaSyA1K8QUA-RC45oGRCvpEqyNaIyrJNXsPzY";
const GIGI_CHANNEL_ID = "UCDHABijvPBnJm7F-KlNME3w";
const FALLBACK_VIDEO_ID = "8zWz92f_HGs";

export default function HomePage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<ContentItem | null>(null);
  const [youtubeVideoId, setYoutubeVideoId] = useState(FALLBACK_VIDEO_ID);
  const [youtubeTitle, setYoutubeTitle] = useState("Loading...");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/content.json')
      .then(res => res.json())
      .then(data => setContentItems(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${GIGI_CHANNEL_ID}&part=snippet&order=date&maxResults=1&type=video`
        );
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          setYoutubeVideoId(data.items[0].id.videoId);
          setYoutubeTitle(data.items[0].snippet.title);
        }
      } catch (error) {
        console.error("Error fetching YouTube video:", error);
        setYoutubeTitle("Latest Stream");
      }
    };
    
    fetchLatestVideo();
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Profile */}
          <aside className={`lg:col-span-3 ${mounted ? 'animate-slideInLeft' : 'opacity-0'}`}>
            <div className="sticky top-24 space-y-6">
              {/* Profile Card */}
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6">
                {/* Profile Image */}
                <div 
                  onClick={() => setImageModalOpen(true)}
                  className="relative w-32 h-32 mx-auto mb-4 cursor-pointer group"
                >
                  <img 
                    src="/images/Screenshot 2026-01-21 155754.png" 
                    alt="Lloyd Joshua M. Matobato"
                    className="w-full h-full rounded-full object-cover border-2 border-[var(--border)] transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent)]/0 to-[var(--accent)]/0 group-hover:from-[var(--accent)]/10 group-hover:to-[var(--accent)]/20 transition-all" />
                </div>

                {/* Name & Title */}
                <div className="text-center mb-4">
                  <h1 className="text-xl font-bold mb-1">Lloyd Joshua M. Matobato</h1>
                  <p className="text-[var(--muted)] text-sm">CS Student</p>
                </div>

                {/* Bio */}
                <p className="text-sm text-[var(--muted)] text-center mb-4">
                  Building stuff and learning things
                </p>

                {/* Quick Info */}
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <MapPin size={16} />
                    <span>Davao, Philippines</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <Calendar size={16} />
                    <span>Joined January 2026</span>
                  </div>
                </div>

                <Divider className="my-4" style={{ borderColor: 'var(--border)' }} />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--accent)]">2.5</div>
                    <div className="text-xs text-[var(--muted)]">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--accent)]">2+</div>
                    <div className="text-xs text-[var(--muted)]">Years</div>
                  </div>
                </div>

                <Divider className="my-4" style={{ borderColor: 'var(--border)' }} />

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link 
                    href="/contact" 
                    className="block w-full px-4 py-2 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] rounded-md text-center text-sm font-medium transition-all hover:-translate-y-0.5"
                  >
                    Get in Touch
                  </Link>
                  <Link 
                    href="/resources" 
                    className="block w-full px-4 py-2 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] rounded-md text-center text-sm font-medium transition-all hover:-translate-y-0.5"
                  >
                    View Resources
                  </Link>
                </div>
              </div>

              {/* Skills/Tech Stack */}
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Code size={16} />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js'].map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className={`lg:col-span-6 space-y-6 ${mounted ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            {/* Welcome Section */}
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-2">
                Hey there! <span className="inline-block animate-pulse">👋</span>
              </h2>
              <p className="text-[var(--muted)] leading-relaxed">
                Welcome to my digital space. I'm a computer science student passionate about web development, 
                open source, and building things that matter. Check out my latest entries below.
              </p>
            </div>

            {/* Content Feed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Recent Entries</h3>
                <span className="text-sm text-[var(--muted)]">{contentItems.length} posts</span>
              </div>

              {contentItems.length === 0 ? (
                <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center">
                  <Coffee size={48} className="mx-auto mb-4 text-[var(--muted)]" />
                  <p className="text-[var(--muted)]">No entries yet. Check back soon!</p>
                </div>
              ) : (
                contentItems.map((item, index) => (
                  <article
                    key={item.id}
                    onClick={() => openBlogModal(item)}
                    className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 card-hover cursor-pointer animate-fadeInUp stagger-${Math.min(index + 3, 5)}`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1 hover:text-[var(--accent)] transition-colors">
                          {item.title}
                        </h4>
                        <time className="text-xs text-[var(--muted)]">
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </time>
                      </div>
                      <ChevronRight size={20} className="text-[var(--muted)] flex-shrink-0 mt-1" />
                    </div>

                    {/* Image Gallery Preview */}
                    {item.images && item.images.length > 0 && (
                      <div className="mb-4">
                        <BlogImageGallery images={item.images} />
                      </div>
                    )}

                    {/* Content Preview */}
                    <p className="text-sm text-[var(--muted)] mb-4 line-clamp-3 whitespace-pre-wrap">
                      {truncateText(item.content)}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))
              )}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className={`lg:col-span-3 ${mounted ? 'animate-slideInRight stagger-3' : 'opacity-0'}`}>
            <div className="sticky top-24 space-y-6">
              {/* Featured Content */}
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Worth Checking Out</h3>
                  <ExternalLink size={14} className="text-[var(--muted)]" />
                </div>
                
                {/* YouTube Embed */}
                <div className="relative w-full overflow-hidden rounded-md bg-black mb-3" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    title={youtubeTitle}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
                
                <p className="text-sm font-medium mb-1">Gigi Murin</p>
                <p className="text-xs text-[var(--muted)] line-clamp-2">{youtubeTitle}</p>
              </div>

              {/* Contribution Graph Placeholder */}
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6">
                <h3 className="text-sm font-semibold mb-4">Activity</h3>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 91 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-sm transition-colors hover:border hover:border-[var(--accent)]"
                      style={{
                        backgroundColor: Math.random() > 0.7 
                          ? `rgba(88, 166, 255, ${Math.random() * 0.8 + 0.2})` 
                          : 'var(--border)'
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs text-[var(--muted)] mt-3">
                  Less <span className="inline-flex gap-1 mx-2">
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'var(--border)' }} />
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(88, 166, 255, 0.3)' }} />
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(88, 166, 255, 0.6)' }} />
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(88, 166, 255, 0.9)' }} />
                  </span> More
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Image Modal */}
      {imageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeInUp"
          onClick={() => setImageModalOpen(false)}
        >
          <div 
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg relative max-w-3xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-[var(--hover-bg)] hover:bg-[var(--muted)] rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>
            <img 
              src="/images/Screenshot 2026-01-21 155754.png" 
              alt="Profile"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {blogModalOpen && selectedBlog && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeInUp"
          onClick={closeBlogModal}
        >
          <div 
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeBlogModal}
              className="sticky top-4 right-4 float-right p-2 bg-[var(--hover-bg)] hover:bg-[var(--muted)] rounded-full transition-colors z-10 m-4"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-2">{selectedBlog.title}</h2>
              <time className="text-sm text-[var(--muted)] block mb-6">
                {new Date(selectedBlog.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </time>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedBlog.tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>

              <Divider className="my-6" style={{ borderColor: 'var(--border)' }} />

              <div className="prose prose-invert max-w-none">
                <p className="text-[var(--muted)] leading-relaxed whitespace-pre-wrap">
                  {selectedBlog.content}
                </p>
              </div>

              {selectedBlog.images && selectedBlog.images.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Gallery</h3>
                  <BlogImageGallery images={selectedBlog.images} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
