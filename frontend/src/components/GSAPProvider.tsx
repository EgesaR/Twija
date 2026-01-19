// app/components/GSAPInitializer.tsx
'use client'; // if your setup supports it; otherwise the useEffect handles it

import { useEffect, useRef } from 'react';

let isRegistered = false;

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || isRegistered) return;
    initialized.current = true;

    (async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      const SplitText = (await import('gsap/SplitText')).default;

      gsap.registerPlugin(ScrollTrigger, SplitText);
      isRegistered = true;
    })();
  }, []);

  return <>{children}</>;
}
