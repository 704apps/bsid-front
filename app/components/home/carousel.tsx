import React, { useRef, useEffect, useState } from "react";

const Carousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'screen-1.png',
    'screen-2.png',
    'screen-3.png',
    'screen-4.png',
    'screen-5.png',
  ];

  const imageTexts = [
    'Tela de Repouso',
    'Tela de Busca',
    'BSID localizando...',
    'BSID localizando...',
    'Notificação',
  ];

  const handleNext = () => {
    if (carouselRef.current) {
      const isLastSlide = currentIndex === images.length - 1;
      setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const isFirstSlide = currentIndex === 0;
      setCurrentIndex(isFirstSlide ? images.length - 1 : currentIndex - 1);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const { children } = carouselRef.current;
      for (let i = 0; i < children.length; i++) {
        (children[i] as HTMLElement).style.transform = `translateX(-${
          currentIndex * 100
        }%)`;
      }
    }
  }, [currentIndex]);

  return (
    <div className="w-full py-12 relative flex flex-col items-center">
      <h2 className="text-4xl text-white mb-4 text-center font-bold">
        Conheça o novo conceito de conexões de conteúdo.
      </h2>
      <p className="text-xl text-zinc-400 mb-8 text-center">
        Simples e rápido, o meio mais fantástico e poderoso de captura de
        estatísticas por link.
      </p>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          ref={carouselRef}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="min-w-full md:min-w-1/3 flex-shrink-0 px-2 relative"
            >
              <img
                src={`/${image}`}
                alt={`Screen ${index + 1}`}
                className="w-full h-auto max-w-xs mx-auto rounded-lg shadow-lg md:max-w-sm"
              />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-2 py-1 rounded text-center text-white">
                {imageTexts[index]}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 md:left-[calc(50%-250px)] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 md:right-[calc(50%-250px)] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
