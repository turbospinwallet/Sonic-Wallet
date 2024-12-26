import React from 'react';
import { FaTelegram, FaXTwitter } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '@/common/constants/const';

const ComingSoonPage = () => {
  return (
    <div className="bg-secondary px-6 flex-1 pb-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-white">Coming Soon!</h1>
      <p className="text-neutral/70 text-center px-4 mb-8">
        This feature is currently under development. Stay tuned for updates!
      </p>

      <div className="flex gap-6">
        <a
          href={SOCIAL_LINKS.X}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral hover:text-primary transition-colors"
        >
          <FaXTwitter size={24} />
        </a>
        <a
          href={SOCIAL_LINKS.TELEGRAM_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral hover:text-primary transition-colors"
        >
          <FaTelegram size={24} />
        </a>
      </div>
    </div>
  );
};

export default ComingSoonPage;
