"use client";
import { Navigation } from "../components/common/navbar";

export default function Create() {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen flex flex-col">
      <Navigation />
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-4xl md:text-6xl text-white font-bold text-center p-4">
          Página de Crie seu BSID
        </h1>
      </div>
    </div>
  );
}
