import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { APP_NAME } from '@/common/constants/const';
import { useDisplayBackButtonMiniApp } from '@/hooks/useDisplayBackButtonMiniApp';

const Home = () => {
  const router = useRouter();
  const { hideBackButton } = useDisplayBackButtonMiniApp();

  useEffect(() => {
    hideBackButton();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center px-6 bg-secondary">
      <div className="text-center flex flex-col gap-16">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={240}
          height={180}
          className="mx-auto rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-1 text-neutral">{APP_NAME} Wallet</h1>
          <p className="text-neutral/80">
            <span>
              {APP_NAME} Wallet — the next Web3 Wallet generation designed to spark and speed up
              your investment journey.
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <ButtonCustom
            color="secondary"
            className="w-full font-bold"
            onClick={() => router.push('/dapp/login')}
          >
            Login
          </ButtonCustom>
          <ButtonCustom
            color="primary"
            className="w-full font-bold"
            onClick={() => router.push('/dapp/create-account')}
          >
            Create account
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default Home;
