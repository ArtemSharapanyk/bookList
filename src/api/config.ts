import { QueryClient } from 'react-query';
import axios from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

axios.interceptors.request.use((config) => ({
  ...config,
  baseURL: process.env.API_URL
}));
