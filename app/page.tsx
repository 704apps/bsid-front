'use client'

import CallToAction from "@/components/landpage/calltoAction";
import Carousel from "@/components/landpage/carousel";
import Description from "@/components/landpage/description";
import Header from "@/components/landpage/header";
import MainMessage from "@/components/landpage/mainmessage";
import NavBar from "@/components/landpage/navbar";
import SoundWaves from "@/components/landpage/soundWaves";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Crie seu BSID em 1 minuto", href: "/" },
  { name: "Baixar APK", href: "/download" },
  { name: "Planos", href: "/plans" },
  { name: "Login", href: "/login" }
];

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [moveTitle, setMoveTitle] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setMoveTitle(true);
    }, 500);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1800);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen overflow-x-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <NavBar showContent={showContent} navigation={navigation} />

      <Header moveTitle={moveTitle} onLoad={() => setShowContent(true)} />

      <div className={`flex flex-col items-center w-full transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <SoundWaves show={showContent} />
        <MainMessage showContent={showContent} />
        <Description showContent={showContent} />
        <CallToAction showContent={showContent} />
        <Carousel />
      </div>
    </div>
  )
}

