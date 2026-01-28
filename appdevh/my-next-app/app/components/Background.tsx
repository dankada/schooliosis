"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export default function Background() {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  // Use state for dimensions to ensure server/client match
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  const STAR_SIZE = 40;
  const SPACING = 3;
  const GRID_SPACING = STAR_SIZE * SPACING;

  useEffect(() => {
    setMounted(true);

    const w = window.innerWidth;
    const h = window.innerHeight;
    setDimensions({ width: w, height: h });

    const generatedStars: Star[] = [];
    let id = 0;
    const cols = Math.ceil(w / GRID_SPACING) + 2;
    const rows = Math.ceil(h / GRID_SPACING) + 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        generatedStars.push({
          id: id++,
          x: col * GRID_SPACING,
          y: row * GRID_SPACING,
          rotation: Math.random() * 360,
        });
      }
    }

    setStars(generatedStars);
  }, []);

  // Return the container immediately, but keep it empty until mounted
  // This satisfies the SSR requirements perfectly.
  return (
    <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none">
      {mounted && (
        <svg 
          className="w-full h-full" 
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} 
          preserveAspectRatio="none" 
          role="img" 
          aria-hidden
        >
          <defs>
            <g id="star">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5.5 5.35 1.3 7.55L12 18.77l-6.8 3.4 1.3-7.55L2 9.27l6.91-1.01L12 2z"
                fill="#87CEEB"
                fillOpacity="0.6"
              />
            </g>
          </defs>

          {stars.map((star) => (
            <g key={star.id} transform={`translate(${star.x},${star.y}) rotate(${star.rotation} 12 12)`}>
              <use href="#star" width={STAR_SIZE} height={STAR_SIZE} x={-STAR_SIZE / 2} y={-STAR_SIZE / 2} />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}