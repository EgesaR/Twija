// utils/gsap.client.ts
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

export function registerGSAP() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  return gsap;
}
