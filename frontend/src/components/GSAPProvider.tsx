// app/components/GSAPProvider.tsx
'use client'; // ← if using any client directive support; otherwise rely on dynamic import

import { useEffect } from 'react';

let registered = false;

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (registered) return;

    (async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      const SplitText = (await import('gsap/SplitText')).default;

      gsap.registerPlugin(ScrollTrigger, SplitText);
      registered = true;
    })();
  }, []);

  return <>{children}</>;
}
