import { useEffect, useRef } from 'react';
import { useCountUp } from 'react-countup';

interface ValueProps {
  start: number;
  value: number;
  duration: number;
  prefix?: string;
  className?: string;
  unit?: string;
  onClick?: () => void;
}

const Value = ({ start, value, duration, prefix = '', className, unit, onClick }: ValueProps) => {
  const { countUp, update } = useCountUp({
    start,
    end: value,
    duration,
    separator: ',',
    decimals: 5,
  });

  const updateValue = useRef(update);

  useEffect(() => {
    updateValue.current(value);
  }, [value, updateValue]);

  return (
    <p
      className={className}
      onClick={onClick}
    >
      {prefix}
      {countUp}
      {unit}
    </p>
  );
};

export default Value;
