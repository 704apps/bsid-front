"use client";
import { Github, Mail, Twitter } from "lucide-react";
import { Navigation } from "../components/navbar";

export default function About() {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen flex flex-col">
      <Navigation />
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-4xl md:text-6xl text-white font-bold text-center p-4">
          Página de Sobre nós
        </h1>
      </div>
    </div>
  );
}
