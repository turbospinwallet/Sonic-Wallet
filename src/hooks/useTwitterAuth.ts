import { useCallback } from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import { LOGIN_SOCIAL_URL } from '@/common/constants/const';

export const useTwitterAuth = () => {
  const { userInfo, closeApp, openLinkWithoutConfirm } = useTelegram();
  const signInWithTwitter = useCallback(() => {
    try {
      const jsonString = JSON.stringify(userInfo);
      const token = Buffer.from(jsonString, 'utf-8').toString('base64');
      const url = `${LOGIN_SOCIAL_URL}/twitter?token=${token}&flag=${Date.now()}`;
      openLinkWithoutConfirm(url);
      if (typeof window !== 'undefined' && window.Telegram && window.Telegram.MobileLayout) {
        closeApp();
      }
    } catch (error) {
      console.error(error);
    }
  }, [userInfo, closeApp, openLinkWithoutConfirm, window?.Telegram?.MobileLayout]);
  return { signInWithTwitter };
};
