import React from 'react';
import { FaTelegram, FaXTwitter } from 'react-icons/fa6';

const ComingSoonPage = () => {
  return (
    <div className="bg-secondary px-6 flex-1 pb-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Coming Soon!</h1>
      <p className="text-neutral/70 text-center px-4 mb-8">
        This feature is currently under development. Stay tuned for updates!
      </p>

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
    </div>
  );
};

export default ComingSoonPage;
