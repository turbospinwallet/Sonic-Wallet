import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';
import ArrowLeft from '@/components/ArrowLeft';
import IconLoading from '@/components/IconLoading/IconLoading';

type BtnVariant = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'info';
type SizeVariant = 'sm' | 'md' | 'xs' | 'sm-md';
export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  variant?: BtnVariant;
  isLoading?: boolean;
  size?: SizeVariant;
  arrow?: boolean;
  disabled?: boolean;
  disabledArrow?: boolean;
  children?: React.ReactNode | ((props: ButtonProps & { isHovered: boolean }) => React.ReactNode);
}

const variantStyleMap: Record<BtnVariant, string> = {
  primary: `hover:bg-primary-2 bg-[#645BF9] ${styles.btnPrimary} group/arrow`,
  secondary: `hover:bg-[#5AFF9C] bg-[#01FF68] ${styles.btnSecondary} group/arrow`,
  tertiary: `hover:bg-[#FFC977] bg-[#FAA23A] ${styles.btnTeritary} group/arrow`,
  disabled: 'bg-[#565656]',
  info: `${styles.btnInfo} group/arrow bg-[#0185FF] hover:bg-[#58AFFF]`,
};

const sizeStyleMap: Record<SizeVariant, string> = {
  xs: 'px-2 py-1 !text-[15px] min-w-[115px] md:min-w-[136px]',
  'sm-md': 'px-2 sm:px-0.5 py-1 sm:py-2 !text-[15px] sm:min-w-[115px]',
  sm: 'px-2 text-[12px] md:text-[16px] min-w-[115px] md:min-w-[136px]',
  md: 'py-1 px-3 md:py-1.5 md:text-[23px] md:text-[26px] min-w-[150px] md:min-w-[190px]',
};

function Button(props: ButtonProps) {
  const variantClass = variantStyleMap[props.variant ?? 'primary'];
  const loadingClass = `${styles.btnInfo} group/arrow bg-[#0185FF]`; // we use info as loading class
  const styleClass = sizeStyleMap[props.size ?? 'md'];
  const hasArrow = props.arrow ?? true;
  const [isHovered, setIsHovered] = React.useState(false);
  const arrowClass =
    props.isLoading || !hasArrow
      ? ''
      : isHovered
      ? 'group-hover/arrow:w-[40px] group-hover/arrow:ml-3'
      : '';

  return (
    <button
      className={clsx(
        'rounded-[31px] flex items-center justify-center text-white text-[26px]',
        props.isLoading && props.disabled ? loadingClass : variantClass,
        props.disabled && !props.isLoading ? '!bg-[#444] !shadow-none pointer-events-none' : '',
        styleClass,
        props.className
      )}
      disabled={props.disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={props.onClick}
    >
      <span className="block mt-[-1px]">
        {typeof props.children === 'function'
          ? props.children({ ...props, isHovered })
          : props.children}
      </span>
      <span
        className={clsx(
          'overflow-hidden w-0 transition-all duration-150',
          arrowClass,
          props.disabledArrow && 'hidden sm:inline'
        )}
      >
        <ArrowLeft className="w-[28px] md:w-[38px] h-[14px] md:h-[20px]" />
      </span>
      {props.isLoading ? <IconLoading className="ml-4 w-6 h-6" /> : null}
    </button>
  );
}

export default Button;
