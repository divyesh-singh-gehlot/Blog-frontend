import { useState } from "react";

const ImageWithFallback = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Placeholder */}
      {!loaded && (
        <img
          src="/fallback.png"
          alt="placeholder"
          className="absolute inset-0 w-full h-full object-cover animate-pulse"
        />
      )}

      {/* Actual Image */}
      <img
        src={error ? "/fallback.png" : src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true); // prevent placeholder from staying forever
        }}
      />
    </div>
  );
};

export default ImageWithFallback;
