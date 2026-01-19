// src/hooks/useClientGSAP.ts
import { useEffect, useRef } from 'react';

let gsapInstance: any = null;
let registered = false;

export function useClientGSAP(callback: (gsap: any) => void) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    (async () => {
      if (!gsapInstance) {
        const [gsapMod, stMod] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);

        gsapInstance = gsapMod.default;
        const ScrollTrigger = stMod.default;

        gsapInstance.registerPlugin(ScrollTrigger);
        registered = true;
      }

      callback(gsapInstance);
    })();
  }, [callback]);
}
