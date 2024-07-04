"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useRouter, usePathname } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const publicPaths = ['/login', '/register'];
    const storedUser = localStorage.getItem('user');

    if (!storedUser && pathname && !publicPaths.includes(pathname)) {
      router.push('/login');
    } else if (storedUser) {
      setIsLoading(false);
    }
  }, [user, router, pathname]);

  if (!user && pathname && !['/login', '/register'].includes(pathname) && isLoading) {
    return <div>Loading...</div>;
  }

  if (!user && pathname && !['/login', '/register'].includes(pathname)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
