import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaTelegram, FaXTwitter } from 'react-icons/fa6';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';

export default function LandingHero() {
  const router = useRouter();

  const handleExploreFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-48 h-48 relative mb-8"
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-neutral"
          >
            Fast, Decentralized, and Profitable
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-neutral/70 max-w-2xl mx-auto"
          >
            Experience the future of decentralized finance with our integrated ecosystem of DeFi,
            NFTs, and gaming.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <ButtonCustom
              color="primary"
              className="w-full sm:w-auto font-bold"
            >
              Coming Soon
            </ButtonCustom>

            <div className="flex gap-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral hover:text-primary transition-colors"
              >
                <FaXTwitter size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral hover:text-primary transition-colors"
              >
                <FaTelegram size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral hover:text-primary transition-colors"
              >
                <img
                  src="/images/linktree.png"
                  alt="linktree"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
