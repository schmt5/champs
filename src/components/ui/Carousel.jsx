import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function Carousel() {
  const [ref] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  return (
    <div className="overflow-hidden" ref={ref}>
      <div className="flex">
        <div className="min-w-0 grow-0 shrink-0 basis-full">
          <img src="/assets/images/champ-1.webp" alt="Slide 1" />
        </div>
        <div className="min-w-0 grow-0 shrink-0 basis-full">
          <img src="/assets/images/champ-2.webp" alt="Slide 2" />
        </div>
        <div className="min-w-0 grow-0 shrink-0 basis-full">
          <img src="/assets/images/champ-3.webp" alt="Slide 3" />
        </div>
      </div>
    </div>
  );
}
