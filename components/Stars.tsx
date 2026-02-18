"use client";
import { useEffect, useState } from "react";

export default function Stars() {
  const [stars, setStars] = useState<Array<{id:number;top:string;left:string;size:number;op:number;dur:number}>>([]);

  useEffect(() => {
    setStars(Array.from({ length: 100 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      op: Math.random() * 0.5 + 0.05,
      dur: Math.random() * 4 + 2,
    })));
  }, []);

  return (
    <div className="stars">
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          top: s.top, left: s.left,
          width: s.size, height: s.size,
          "--op": s.op, "--dur": `${s.dur}s`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}
