import { contactInfo } from '@/data/contact';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <motion.a
      href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
      target='_blank'
      rel='noopener noreferrer'
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className='fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow'
      aria-label='Chat on WhatsApp'
    >
      <MessageCircle className='w-7 h-7 text-white fill-white' />

      {/* Pulse Animation */}
      <span className='absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30' />
    </motion.a>
  );
};

export default WhatsAppButton;
