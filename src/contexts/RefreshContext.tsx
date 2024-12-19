import type { PropsWithChildren } from 'react';
import React, { useEffect, useState } from 'react';

const FAST_INTERVAL = 3000;
const SLOW_INTERVAL = 5000;

const RefreshContext = React.createContext({ slow: 0, fast: 0 });

// This contexts maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({ children }: PropsWithChildren) => {
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFast((prev) => prev + 1);
    }, FAST_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlow((prev) => prev + 1);
    }, SLOW_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return <RefreshContext.Provider value={{ slow, fast }}>{children}</RefreshContext.Provider>;
};

export { RefreshContext, RefreshContextProvider };
