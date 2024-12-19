import { useCallback } from 'react';
import { LOGIN_SOCIAL_URL } from '@/common/constants/const';
import { useTelegram } from '@/hooks/useTelegram';
export const useDiscordAuth = () => {
  // get query params
  const { userInfo, closeApp, openLinkWithoutConfirm } = useTelegram();

  const signInWithDiscord = useCallback(() => {
    const jsonString = JSON.stringify(userInfo);
    const token = Buffer.from(jsonString, 'utf-8').toString('base64');
    const url = `${LOGIN_SOCIAL_URL}/discord?token=${token}&flag=${Date.now()}`;
    openLinkWithoutConfirm(url);
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.MobileLayout) {
      closeApp();
    }
  }, [userInfo, closeApp, openLinkWithoutConfirm, window?.Telegram?.MobileLayout]);

  return {
    signInWithDiscord,
  };
};
