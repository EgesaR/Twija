export type ServiceIcon = 'fa_heart' | 'fa_guide' | 'fa_leaf';

export interface ServiceProps {
  id: string;
  icon?: ServiceIcon;
  title: string;
  description: string;
}