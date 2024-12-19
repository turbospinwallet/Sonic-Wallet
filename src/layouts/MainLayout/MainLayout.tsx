import React from 'react';
import Header from '@/layouts/MainLayout/Header/MainHeader';
import Container from '@/components/Container';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col text-base ">
      <Header />
      <Container className="mx-auto">
        <main className="flex-1 flex flex-col bg-color-bg-main rounded-[30px] sm:px-3 px-2 mb-10">
          {children}
        </main>
      </Container>
    </div>
  );
};

export default MainLayout;
