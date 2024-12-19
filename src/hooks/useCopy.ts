import useNotification from '@/hooks/useNotification';

export const useCopyText = () => {
  const toast = useNotification();
  const copyText = (text: string, showMessage = true) => {
    void navigator.clipboard.writeText(text);
    if (showMessage) {
      toast('Copied to clipboard successfully', 'success');
    }
  };

  return { copyText };
};
