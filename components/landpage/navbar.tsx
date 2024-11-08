import React from 'react';
import Link from 'next/link';

interface NavBarProps {
  showContent: boolean;
  navigation: { name: string; href: string }[];
}

const NavBar: React.FC<NavBarProps> = ({ showContent, navigation }) => {
  return (
    <nav className="w-full">
      {showContent && (
        <div className="hidden md:flex justify-center mt-8 transition-opacity duration-1000">
          <ul className="flex items-center justify-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg duration-500 text-zinc-500 hover:text-zinc-300"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </div>
      )}
      {/* <MobileMenu /> */}
    </nav>
  );
};

export default NavBar;
