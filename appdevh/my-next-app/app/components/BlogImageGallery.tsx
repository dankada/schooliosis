"use client";

import { useState, useRef } from "react";
import { Galleria } from "primereact/galleria";

interface BlogImageGalleryProps {
  images: string[];
}

export default function BlogImageGallery({ images }: BlogImageGalleryProps) {
  const galleria = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const openAt = (idx: number) => {
    setActiveIndex(idx);
    galleria.current?.show();
  };

  const galleriaValue = images.map((src) => ({
    itemImageSrc: src,
    thumbnailImageSrc: src,
  }));

  return (
    <>
      <div className="w-full my-6">
        {/* The Grid: 
            - auto-rows-auto ensures the height grows with content.
            - No more "sideImages" slice; we map the whole array.
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="relative cursor-pointer overflow-hidden rounded-lg bg-gray-200 h-48 md:h-64 group"
              onClick={() => openAt(idx)}
            >
              <img
                src={img}
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Optional: Hover overlay to show it's clickable */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      <Galleria
        ref={galleria}
        value={galleriaValue}
        activeIndex={activeIndex}
        onItemChange={(e) => setActiveIndex(e.index)}
        fullScreen
        showThumbnails={images.length > 1}
        showItemNavigators
        circular
        // High z-index to ensure it sits above everything
        baseZIndex={10000} 
        item={(item) => (
          <img 
            src={item.itemImageSrc} 
            alt="Full size" 
            style={{ width: '100%', display: 'block', maxHeight: '90vh', objectFit: 'contain' }} 
          />
        )}
        thumbnail={(item) => (
          <img 
            src={item.thumbnailImageSrc} 
            alt="Thumbnail" 
            style={{ display: 'block', width: '80px', height: '60px', objectFit: 'cover' }} 
          />
        )}
      />
    </>
  );
}