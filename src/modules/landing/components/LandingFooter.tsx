import Image from 'next/image';
import Link from 'next/link';
import { FiMessageCircle, FiMessageSquare, FiTwitter } from 'react-icons/fi';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';

const links = [
  { label: 'Ecosystem', href: '#' },
  { label: 'Whitepaper', href: '#' },
  { label: 'Contact Us', href: '#' },
];

const socials = [
  { icon: FiMessageCircle, href: '#', label: 'Telegram' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiMessageSquare, href: '#', label: 'Discord' },
];

export default function LandingFooter() {
  return (
    <footer className="bg-secondary border-t border-neutral/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:justify-start">
            <div className="relative w-24 h-24">
              <Image
                src="/images/logo.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <nav className="flex justify-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-neutral/70 hover:text-neutral transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center md:justify-end gap-4">
            {socials.map((social) => (
              <ButtonCustom
                key={social.label}
                className="text-neutral/70 hover:text-neutral hover:bg-neutral/10"
              >
                <Link href={social.href}>
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              </ButtonCustom>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral/10 text-center text-neutral/50 text-sm">
          © {new Date().getFullYear()} Turbo Spin. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
