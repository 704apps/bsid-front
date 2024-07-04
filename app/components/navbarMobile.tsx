import Link from "next/link";
import React, { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = [
    { name: "Login", href: "/login" },
    { name: "Quem somos", href: "/about" },
    { name: "Planos", href: "/plans" },
  ];

  return (
    <div className="md:hidden w-full">
      <div className="flex justify-between items-center p-4">
        <Link
          href="/create"
          className="text-sm text-zinc-500 hover:text-zinc-300 pl-4"
        >
          Crie seu BSID em 1 minuto
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-zinc-500 focus:outline-none pr-4"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75 backdrop-blur-md">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-zinc-500 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <ul className="flex flex-col items-center space-y-4 mt-4">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-lg text-white hover:text-gray-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
