import React, { useEffect } from 'react';
import ClaimScreen from '@/modules/claim/ClaimScreen';
import { useDisplayBackButtonMiniApp } from '@/hooks/useDisplayBackButtonMiniApp';
import { useWallet } from '@/hooks/useWallet';
import { useQueryUserByAddress } from '@/hooks/queries/user';

const Claim = () => {
  const { address } = useWallet();
  useQueryUserByAddress(address);
  const { showBackButton } = useDisplayBackButtonMiniApp();

  useEffect(() => {
    showBackButton();
  }, []);

  return <ClaimScreen />;
};

export default Claim;
