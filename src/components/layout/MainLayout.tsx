import React, { FC } from 'react';
import { Header } from './Header';
import { WithChildren } from '../../types/WithChildren';
import { Toaster } from '../../utils/toaster/toaster';

export const MainLayout: FC<WithChildren> = ({ children }) => {
  return (
    <div className="app-content max-w-[1200px] mx-[auto] px-[4%]">
      <Header />
      <main>{children}</main>
      <Toaster />
    </div>
  );
};
