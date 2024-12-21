import React, { useEffect } from 'react';
import { useDisplayBackButtonMiniApp } from '@/hooks/useDisplayBackButtonMiniApp';

const Frens = () => {
  const { hideBackButton } = useDisplayBackButtonMiniApp();

  useEffect(() => {
    hideBackButton();
  }, []);

  return (
    <div className="min-h-screen flex flex-col px-6 py-10 bg-secondary">
      <h1 className="text-3xl font-bold text-neutral">Frens</h1>
      {/* Add your Frens page content here */}
    </div>
  );
};

export default Frens;
