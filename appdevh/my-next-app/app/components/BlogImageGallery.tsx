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
      <div className="w-full my-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="relative cursor-pointer overflow-hidden rounded-md bg-[var(--hover-bg)] aspect-video group"
              onClick={() => openAt(idx)}
            >
              <img
                src={img}
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
        baseZIndex={10000}
        style={{ 
          background: 'rgba(0, 0, 0, 0.95)',
        }}
        item={(item) => (
          <img 
            src={item.itemImageSrc} 
            alt="Full size" 
            style={{ 
              width: '100%', 
              display: 'block', 
              maxHeight: '90vh', 
              objectFit: 'contain' 
            }} 
          />
        )}
        thumbnail={(item) => (
          <img 
            src={item.thumbnailImageSrc} 
            alt="Thumbnail" 
            style={{ 
              display: 'block', 
              width: '80px', 
              height: '60px', 
              objectFit: 'cover',
              borderRadius: '4px'
            }} 
          />
        )}
      />
    </>
  );
}
