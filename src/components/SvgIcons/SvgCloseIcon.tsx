import type { SVGProps } from 'react';

function SvgCloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.515149 0L16.9999 16.4848L16.4848 17L0 0.515152L0.515149 0Z"
        fill="#918DEF"
      />
      <path
        d="M16.4848 0L7.36468e-05 16.4848L0.515223 17L17 0.515152L16.4848 0Z"
        fill="#918DEF"
      />
    </svg>
  );
}

export default SvgCloseIcon;
