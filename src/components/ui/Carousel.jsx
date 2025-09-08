import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CarouselSlide } from "./CarouselSlide";
import { memo } from "react";

function CarouselComponent() {
  const [ref] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  return (
    <div className="overflow-hidden" ref={ref}>
      <div className="flex">
        <div className="min-w-0 grow-0 shrink-0 basis-full">
          <CarouselSlide src="/assets/images/champ-2.webp" alt="Champion 1" />
        </div>
        <div className="min-w-0 grow-0 shrink-0 basis-full">
          <CarouselSlide src="/assets/images/champ-3.webp" alt="Champion 2" />
        </div>
        <div className="min-w-0 grow-0 shrink-0 basis-full">
          <CarouselSlide src="/assets/images/champ-4.webp" alt="Champion 3" />
        </div>
      </div>
    </div>
  );
}

export const Carousel = memo(CarouselComponent);
