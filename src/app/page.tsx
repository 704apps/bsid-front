'use client'

import CallToAction from "@/components/landpage/CallToAction";
import Carousel from "@/components/landpage/Carousel";
import Content from "@/components/landpage/Content";
import Description from "@/components/landpage/Description";
import MainMessage from "@/components/landpage/MainMessage";
import NavBar from "@/components/landpage/Navbar";
import Particles from "@/components/landpage/Particles";
import SoundWaves from "@/components/landpage/SoundWaves";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Crie seu BSID em 1 minuto", href: "/painel" },
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
    <div className="flex flex-col items-center justify-between w-full min-h-screen overflow-x-hidden">
      <Particles className="fixed inset-0 bg-black z-[-1]" quantity={40} staticity={60} ease={50} refresh={true} />
      
      <NavBar showContent={showContent} navigation={navigation} />

      <CallToAction moveTitle={moveTitle} onLoad={() => setShowContent(true)} />

      <div className={`flex flex-col items-center w-full transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <SoundWaves show={showContent} />
        <MainMessage showContent={showContent} />
        <Description showContent={showContent} />
        <Content showContent={showContent} />
        <Carousel />
      </div>
    </div>
  )
}

