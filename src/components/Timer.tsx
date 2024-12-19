import React, { useEffect, useRef, useState } from 'react';

interface Props {
  startAt: string | number;
  renderer: (props: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => JSX.Element;
}

const Timer = ({ startAt, renderer }: Props) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const myInterval = useRef<NodeJS.Timeout | null>(null);
  const time = new Date(startAt).getTime();
  const math = (currentTime - time) / 1000;
  const diffTime = Math.floor(math > 0 ? math : 0);

  useEffect(() => {
    myInterval.current = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(myInterval.current!);
  }, []);

  return renderer({
    seconds: diffTime % 60,
    minutes: Math.floor(diffTime / 60) % 60,
    hours: Math.floor(diffTime / 60 / 60) % 24,
    days: Math.floor(diffTime / 60 / 60 / 24),
  });
};

export default React.memo(Timer);
