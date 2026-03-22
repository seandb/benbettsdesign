import { useState } from "react";

interface Image {
  src: string;
  alt: string;
}

interface Props {
  images: Image[];
  columns?: "2" | "3";
}

export default function ImageGallery({ images, columns = "3" }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const className = columns === "2" ? "image-gallery two-col" : "image-gallery";

  return (
    <>
      <div className={className}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            onClick={() => setLightboxSrc(img.src)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
      {lightboxSrc && (
        <div className="lightbox active" onClick={() => setLightboxSrc(null)}>
          <img src={lightboxSrc} alt="Full size" />
        </div>
      )}
    </>
  );
}
