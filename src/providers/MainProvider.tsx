import React, { FC } from 'react';
import { QueryClientProvider } from 'react-query';
import { WithChildren } from '../types/WithChildren';
import { queryClient } from '../api/config';

export const MainProvider: FC<WithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
