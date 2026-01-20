// utils/gsap.client.ts

// 1. Use the /dist/ versions for everything to be safe in SSR
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';

export function registerGSAP() {
  // 2. Add a guard so the server doesn't try to register plugins
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }
  return gsap;
}

// Export the instances as well for easy access
export { gsap, ScrollTrigger, SplitText };
