import { useRef, useState } from 'react';

export interface UseConfirmDialogRevealResult<C> {
  data?: C;
  isCanceled: boolean;
}

const noop = () => {};

export interface UseConfirmDialogReturn<ConfirmData> {
  isRevealed: boolean;

  revealData: ConfirmData | undefined;

  makeReveal: (data?: ConfirmData) => Promise<UseConfirmDialogRevealResult<ConfirmData>>;

  makeConfirm: () => void;

  makeCancel: () => void;
}

export function useConfirm<ConfirmData = any>(
  defaultReveal = false
): UseConfirmDialogReturn<ConfirmData> {
  const [isRevealed, setIsRevealed] = useState(defaultReveal);
  const [revealData, setRevealData] = useState<ConfirmData | undefined>(undefined);
  const _resolve = useRef<(arg0: UseConfirmDialogRevealResult<ConfirmData>) => void>(noop);

  const makeReveal = (data?: ConfirmData) => {
    setIsRevealed(true);
    setRevealData(data);

    return new Promise<UseConfirmDialogRevealResult<ConfirmData>>((resolve) => {
      _resolve.current = resolve;
    });
  };

  const makeConfirm = () => {
    const currentRevealData = revealData;
    setIsRevealed(false);
    setRevealData(undefined);

    _resolve.current({ data: currentRevealData, isCanceled: false });
  };

  const makeCancel = () => {
    setIsRevealed(false);
    setRevealData(undefined);

    _resolve.current({ data: undefined, isCanceled: true });
  };

  return {
    isRevealed,
    revealData,
    makeReveal,
    makeConfirm,
    makeCancel,
  };
}
