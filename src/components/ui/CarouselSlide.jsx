export function CarouselSlide({ src, alt }) {
  return (
    <div className="flex items-center justify-center p-6">
      <div
        className="relative transition-all duration-300"
        style={{
          transformStyle: "preserve-3d",
          perspective: "800px",
        }}
      >
        {/* The image itself */}
        <div
          className="overflow-hidden rounded-xl"
          style={{
            transform: "translateZ(12px) rotateY(-8deg)",
            transition: "all 0.3s ease",
          }}
        >
          <img
            src={src}
            alt={alt}
            className="rounded-md transition-all duration-300 h-[360px] lg:h-auto"
            style={{
              filter: "brightness(1.1) contrast(1.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
