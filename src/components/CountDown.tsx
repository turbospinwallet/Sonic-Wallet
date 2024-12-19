import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  renderer: (props: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
    date: string | number;
    customData?: any;
  }) => JSX.Element;
  date: string | number;
  onCompleted?: () => void;
  customData?: any;
}

const CountDown: FC<Props> = ({ date, renderer, onCompleted, customData }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const myInterval = useRef<NodeJS.Timeout | null>(null);
  const time = new Date(date).getTime();
  const completedRef = useRef<undefined | (() => void)>(undefined);
  const diffTime = Math.floor((time - currentTime) / 1000);
  const days = Math.floor(diffTime / 86400);
  const hours = Math.floor((diffTime % 86400) / 3600);
  const minutes = Math.floor((diffTime % 3600) / 60);
  const seconds = Math.floor(diffTime % 60);
  completedRef.current = onCompleted;

  useEffect(() => {
    if (diffTime > 0) {
      myInterval.current = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
    } else {
      clearInterval(myInterval.current!);
      myInterval.current = null;
    }

    return () => clearInterval(myInterval.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    if (diffTime < 0) {
      clearInterval(myInterval.current!);
      myInterval.current = null;
      completedRef.current?.();
    }
  }, [diffTime]);

  useEffect(() => {
    setCurrentTime(Date.now());
  }, [date]);

  return renderer({
    days,
    hours,
    minutes,
    seconds,
    completed: diffTime < 0,
    date,
    customData,
  });
};

export default React.memo(CountDown);
