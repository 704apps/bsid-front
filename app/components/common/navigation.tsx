"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref} className="mb-6">
      <div className={`fixed inset-x-0 top-0 z-50 ${isIntersecting ? 'bg-white' : 'bg-white'}`}>
        <div className="container flex flex-col md:flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-end gap-4 md:gap-8 text-right">
            {pathname === "/dashboard/createAudioSignature" ? (
              <Link href="/dashboard/viewAudioSignatures" className="text-gray-700">
                Visualizar BSIDs
              </Link>
            ) : (
              <Link href="/dashboard/createAudioSignature" className="text-gray-700">
                Crie seu BSID
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
