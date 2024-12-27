import Image from 'next/image';
import Link from 'next/link';
import { FiMessageCircle } from 'react-icons/fi';
import { FaTelegram, FaXTwitter } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '@/common/constants/const';

const socials = [
  {
    icon: FaXTwitter,
    href: SOCIAL_LINKS.X,
    label: 'X (Twitter)',
    color: 'hover:text-blue-400',
  },
  {
    icon: FaTelegram,
    href: SOCIAL_LINKS.TELEGRAM_CHANNEL,
    label: 'Telegram Channel',
    color: 'hover:text-sky-400',
  },
  {
    icon: FiMessageCircle,
    href: SOCIAL_LINKS.TELEGRAM_GROUP,
    label: 'Telegram Group',
    color: 'hover:text-sky-500',
  },
];

const footerLinks = [
  {
    title: 'Products',
    items: [
      { label: 'Wallet', href: '#' },
      { label: 'Mini Games', href: '#' },
      { label: 'Staking', href: '#' },
      { label: 'NFT Marketplace', href: '#' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Documentation', href: '#' },
      { label: 'Whitepaper', href: '#' },
      { label: 'Token Info', href: '#tokenomics' },
      { label: 'Roadmap', href: '#roadmap' },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'Telegram', href: SOCIAL_LINKS.TELEGRAM_GROUP },
      { label: 'Twitter', href: SOCIAL_LINKS.X },
      { label: 'Channel', href: SOCIAL_LINKS.TELEGRAM_CHANNEL },
      { label: 'Bot', href: SOCIAL_LINKS.BOT_LINK },
    ],
  },
];

export default function LandingFooter() {
  return (
    <footer className="bg-secondary/50 border-t border-neutral/10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="py-8 md:py-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 lg:col-span-2 space-y-4 md:space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600">
                Turbo Spin
              </h3>
            </div>
            <p className="text-sm md:text-base text-neutral/70 max-w-sm">
              Breaking speed barriers in decentralized finance. Fast, secure, and accessible crypto
              wallet built on Sonic Network.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className={`text-neutral/70 hover:scale-110 transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div
              key={section.title}
              className="space-y-3 md:space-y-4"
            >
              <h4 className="text-sm md:text-base text-neutral font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-xs md:text-sm text-neutral/70 hover:text-primary transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="py-4 md:py-6 border-t border-neutral/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-neutral/50">
            <p>© {new Date().getFullYear()} Turbo Spin. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6">
              <Link
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
