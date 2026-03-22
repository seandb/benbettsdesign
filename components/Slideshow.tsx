import { useState, useEffect, useCallback } from "react";

interface Image {
  src: string;
  alt: string;
}

export default function Slideshow({ images }: { images: Image[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [playing, next]);

  return (
    <>
      <div className="gallery-slideshow">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className={i === current ? "active" : ""}
          />
        ))}
      </div>
      <div className="slideshow-controls">
        <button onClick={prev}>Prev</button>
        <button onClick={() => setPlaying((p) => !p)}>Play/Pause</button>
        <button onClick={next}>Next</button>
      </div>
    </>
  );
}
