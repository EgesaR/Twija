import type { ServiceIcon } from '@/types/service';
import type React from 'react';
import {
  FaFacebook,
  FaHandHoldingHeart,
  FaInstagram,
  FaLeaf,
  FaLightbulb,
  FaTwitter,
} from 'react-icons/fa';

export const iconMap = {
  fa_heart: FaHandHoldingHeart,
  fa_guide: FaLightbulb,
  fa_leaf: FaLeaf,
  fa_instagram: FaInstagram,
  fa_facebook: FaFacebook,
  fa_X: FaTwitter,
}; //satisfies Record<ServiceIcon, React.ComponentType>;
