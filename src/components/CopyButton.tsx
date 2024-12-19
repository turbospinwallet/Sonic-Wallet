import type { SVGProps } from 'react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

function ClipboardIcon(_props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="13"
      viewBox="0 0 11 13"
      fill="none"
    >
      <path
        d="M7.33333 0.764706C7.33333 0.342371 7.00501 0 6.6 0H0.733333C0.328325 0 0 0.34237 0 0.764706V9.17647C0 9.59881 0.328325 9.94118 0.733333 9.94118H2.2C2.60501 9.94118 2.93333 9.59881 2.93333 9.17647V3.05882C2.93333 2.63649 3.26166 2.29412 3.66667 2.29412H6.6C7.00501 2.29412 7.33333 1.95175 7.33333 1.52941V0.764706Z"
        fill="#5A5A5A"
      />
      <path
        d="M3.66667 3.82353C3.66667 3.40119 3.99499 3.05882 4.4 3.05882H10.2667C10.6717 3.05882 11 3.40119 11 3.82353V12.2353C11 12.6576 10.6717 13 10.2667 13H4.4C3.99499 13 3.66667 12.6576 3.66667 12.2353V3.82353Z"
        fill="#5A5A5A"
      />
    </svg>
  );
}

export default function CopyButton({ content }: { content: string }) {
  const [copyCount, setCopyCount] = useState(0);
  const copied = copyCount > 0;

  useEffect(() => {
    if (copyCount > 0) {
      const timeout = setTimeout(() => setCopyCount(0), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copyCount]);

  return (
    <button
      type="button"
      className={clsx(
        'group/button relative text-blackoverflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium backdrop-blur transition focus:opacity-100 group-hover:opacity-100',
        copied
          ? 'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20'
          : 'bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5'
      )}
      onClick={async () => {
        await window.navigator.clipboard.writeText(content).then(() => {
          setCopyCount((count) => count + 1);
        });
      }}
    >
      <span
        aria-hidden={copied}
        className={clsx(
          'pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300 px-3',
          copied && '-translate-y-1.5 opacity-0'
        )}
      >
        <ClipboardIcon className="h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400" />
      </span>

      <span
        aria-hidden={!copied}
        className={clsx(
          'pointer-events-none top-1/2 -translate-y-1/2 text-[12px] absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300',
          !copied && 'translate-y-1.5 opacity-0'
        )}
      >
        Copied!
      </span>
    </button>
  );
}
