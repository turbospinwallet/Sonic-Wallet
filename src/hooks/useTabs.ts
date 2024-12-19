import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

export interface UseTabsReturn<T> {
  currentTab: T | undefined;
  handleChangeCurrentTab: (newTabValue: T) => void;
}

export interface UseTabsOptions<T> {
  defaultVal?: T;
  saveToUrl?: boolean;
}

function useTabs<T = number>(tabKey: string, options?: UseTabsOptions<T>): UseTabsReturn<T> {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<T | undefined>(() => {
    if (options?.saveToUrl) {
      const { [tabKey]: tab } = router.query;
      if (tab !== undefined) {
        return tab as T;
      }
    }

    if (options?.defaultVal !== undefined) {
      return options.defaultVal;
    }

    return undefined;
  });

  const handleChangeCurrentTab = useCallback(
    (newTabValue: T) => {
      setCurrentTab(newTabValue);
      if (options?.saveToUrl) {
        void router.push({ query: { [tabKey]: newTabValue as string } }, undefined, {
          shallow: true,
        });
      }
    },
    [options?.saveToUrl, router, tabKey]
  );

  return {
    currentTab,
    handleChangeCurrentTab,
  };
}

export default useTabs;
