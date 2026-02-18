"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  opacity: number;
  duration: number;
}

export default function Stars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.6 + 0.1,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="stars">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            "--opacity": star.opacity,
            "--duration": `${star.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
