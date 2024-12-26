import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { SOCIAL_LINKS } from '@/common/constants/const';
import SonicStormBackground from '@/modules/landing/components/SonicStormBackground';

export default function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <SonicStormBackground />
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
            className="text-6xl font-extrabold text-white mb-6 tracking-tight text-center"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-white to-blue-600">
              Turbo Spin Wallet
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            An innovative cryptocurrency wallet built on the Sonic Network, seamlessly integrated
            with the Telegram Mini App platform. Fast, secure, and accessible.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <Link
              href={SOCIAL_LINKS.BOT_LINK}
              target="_blank"
            >
              <ButtonCustom
                color="primary"
                className="w-full sm:w-auto font-bold"
              >
                Launch App
              </ButtonCustom>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
