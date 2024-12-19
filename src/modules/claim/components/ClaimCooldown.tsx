import React from 'react';
import CountDown from '@/components/CountDown';

export interface MintCooldownProps {
  onComplete: () => void;
  date: number | undefined;
}

function toTwoDigits(num: number) {
  return num >= 10 ? num : `0${num}`;
}

function ClaimCooldown(props: MintCooldownProps) {
  const renderBox = ({
    // days,
    hours,
    minutes,
    seconds,
  }: {
    days: number | undefined;
    hours: number | undefined;
    minutes: number | undefined;
    seconds: number | undefined;
    completed: boolean | undefined;
    date: number;
  }) => {
    return (
      <div className="flex flex-row items-center gap-0.5 justify-center text-sm font-bold">
        <span>{hours ? `${toTwoDigits(hours)}h` : ''}</span>
        <span>{minutes ? toTwoDigits(minutes) : '00'}m</span>
        <span>{seconds ? toTwoDigits(seconds) : '00'}s</span>
      </div>
    );
  };
  if (typeof props.date === 'undefined') {
    return renderBox({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      completed: true,
      date: 0,
    });
  }

  return (
    <CountDown
      renderer={renderBox as any}
      date={props.date}
      onCompleted={props.onComplete}
    />
  );
}

export default ClaimCooldown;
