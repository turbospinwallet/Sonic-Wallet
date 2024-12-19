import { useRouter } from 'next/router';

export const useDisplayBackButtonMiniApp = () => {
  const router = useRouter();
  const showBackButton = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (window.Telegram?.WebApp?.BackButton) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const { BackButton } = window.Telegram.WebApp;
      BackButton.show();
      BackButton.onClick(() => {
        router.back();
      });
    }
  };

  const hideBackButton = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (window.Telegram?.WebApp?.BackButton) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.Telegram.WebApp.BackButton.hide();
    }
  };

  return {
    showBackButton,
    hideBackButton,
  };
};
