import { create } from 'zustand';

export enum ModalType {
  Wallet,
  Purchase,
}

export interface ModalItem {
  id: 'mineCart' | 'shovel' | 'mineral';
  value: number;
  price: number;
  level: string | number;
  note: string;
  title: string;
  desc: string;
  icon: {
    src: string;
    alt: string;
  };
  onSubmit?: () => void | Promise<any>;
  disabled?: boolean;
  isSui?: boolean;
}

export interface ModalArgsType {}

export interface ModalState {
  openWallet: () => void;
  openPurchase: () => void;
  onClose: () => void;
  modalType: ModalType | undefined;
  modalArgs: ModalArgsType | undefined;

  upgradeModal?: {
    isOpen: boolean;
    item?: ModalItem;
  };
  closeUpgradeModal: () => void;
  openUpgradeModal: ({ item }: { item: ModalItem }) => void;
}

export const useModalState = create<ModalState>((set) => ({
  modalType: undefined,
  modalArgs: undefined,
  shouldRecallInterval: false,
  upgradeModal: undefined,
  closeUpgradeModal: () => {
    set({
      upgradeModal: {
        isOpen: false,
      },
    });
  },
  openUpgradeModal: ({ item }) => {
    set({
      upgradeModal: { isOpen: true, item },
    });
  },
  openWallet: () => {
    set({ modalType: ModalType.Wallet });
  },
  openPurchase: () => {
    set({ modalType: ModalType.Purchase, modalArgs: {} });
  },
  onClose: () => {
    set({ modalType: undefined, modalArgs: undefined });
  },
}));
