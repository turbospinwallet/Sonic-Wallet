import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface SectionTitleProps {
  className?: string;
  renderAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

function SectionTitle({ className, renderAs, children }: PropsWithChildren<SectionTitleProps>) {
  const Component = renderAs ?? 'h2';
  return (
    <Component
      className={clsx(
        'text-3xl text-center font-extrabold font-montserrat uppercase text-[#FFF8E1]',
        className
      )}
      style={{
        textShadow: '0px 0px 6px #FFF8E1',
      }}
    >
      {children}
    </Component>
  );
}

export default SectionTitle;
