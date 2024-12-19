// import { useInitData, useUtils } from '@tma.js/sdk-react';
import { useCallback, useEffect, useState } from 'react';
import { TEST_USER_TELEGRAM } from '@/common/constants/const';
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: any;
        expand: () => void;
        openTelegramLink: (link: string) => void;
        close: () => void;
        openLink: (link: string) => void;
        onEvent: (event: string, callback: () => void) => void;
      };
      MobileLayout?: {
        openApplicationFullScreen: () => void;
      };
    };
  }
}
export const useTelegram = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [params, setParams] = useState<any>({});

  const forceFullScreenMode = useCallback(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      setTimeout(() => {
        window.Telegram.WebApp?.expand();
      }, 1000);
    }
  }, []);

  const openFullScreenOnMobile = () => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.MobileLayout) {
      window.Telegram.MobileLayout.openApplicationFullScreen();
    }
  };

  useEffect(() => {
    function initTg() {
      if (TEST_USER_TELEGRAM) {
        setUserInfo(JSON.parse(TEST_USER_TELEGRAM));
        return;
      }
      if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
        const tgData = window.Telegram.WebApp?.initDataUnsafe;
        const _params: any = {};
        if (tgData?.start_param) {
          const parseParams = tgData?.start_param.split('_');
          if (parseParams?.length === 1 && Number(parseParams[0])) {
            _params.code = Number(parseParams[0]);
          } else {
            parseParams.forEach((param: string) => {
              const [key, value] = param.split('=');
              if (key && value) {
                _params[key] = value;
              }
            });
          }
          setParams(_params);
        }
        setUserInfo(tgData);

        // Listen for the WebAppReady event
        window.Telegram.WebApp.onEvent('WebAppReady', openFullScreenOnMobile);
      } else {
        setTimeout(initTg, 500);
      }
    }
    initTg();
  }, []);

  const shareToTelegram = (text: string, url: string) => {
    const shareLink = `http://t.me/share/url?url=${url}&text=${text}`;
    window?.Telegram?.WebApp.openTelegramLink(shareLink);
  };

  const createLinkJoinGroup = (url: string) => {
    window?.Telegram?.WebApp.openTelegramLink(url);
  };

  const closeApp = () => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp?.close();
    }
  };

  const openLinkWithoutConfirm = (url: string) => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openLink(url);
    } else {
      window.location.href = url;
    }
  };

  return {
    params,
    userInfo,
    forceFullScreenMode,
    closeApp,
    createLinkJoinGroup,
    shareToTelegram,
    openLinkWithoutConfirm,
    openFullScreenOnMobile,
  };
};
