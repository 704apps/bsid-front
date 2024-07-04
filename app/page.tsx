"use client";

import React, { useEffect, useState } from "react";
import NavBar from "./components/home/navbar";
import Header from "./components/home/header";
import SoundWaves from "./components/soundWaves";
import MainMessage from "./components/home/mainmessage";
import Description from "./components/home/description";
import CallToAction from "./components/home/calltoAction";
import Carousel from "./components/home/carousel";

const navigation = [
  { name: "Crie seu BSID em 1 minuto", href: "/create" },
  { name: "Quem somos", href: "/about" },
  { name: "Planos", href: "/plans" },
  { name: "Login", href: "/login" }
];

const Home: React.FC = () => {
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
  );
};

export default Home;
