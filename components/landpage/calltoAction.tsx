import React, { useEffect } from 'react';

interface HeaderProps {
  moveTitle: boolean;
  onLoad: () => void;
}

const CallToAction: React.FC<HeaderProps> = ({ moveTitle, onLoad }) => {
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      onLoad();
    }, 1800);

    return () => {
      clearTimeout(loadTimer);
    };
  }, [onLoad]);

  return (
    <div className="flex flex-col items-center mt-8 md:mt-16 w-full overflow-hidden">
      <div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <h1
        className={`z-10 text-5xl sm:text-6xl md:text-9xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display bg-clip-text transition-all ease-in-out mt-16 text-center`}
      >
        BSID
      </h1>
      <div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div
        className={`text-center animate-fade-in transition-opacity duration-1000 ${moveTitle ? "opacity-100 mt-4" : "opacity-0"}`}
      >
        <h1 className="text-lg sm:text-md text-zinc-500">Sua Assinatura de Áudio</h1>
      </div>
    </div>
  );
};

export default  CallToAction
