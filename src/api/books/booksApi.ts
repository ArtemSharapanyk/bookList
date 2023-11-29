import { useMutation, useQuery } from 'react-query';
import { endpoints } from '../endpoints';
import { BookScheme } from './BookScheme';
import { $axios, queryClient } from '../config';
import { toast } from '../../utils/toaster/use-toast';

export const useBooksApi = (filter: string, raitingFilter: number | null) => {
  const {
    isLoading,
    isError,
    data: books,
    isFetching,
    refetch,
    error,
    isRefetching
  } = useQuery(
    [endpoints.books, filter, raitingFilter],
    () => {
      return $axios.get<BookScheme[]>(`${endpoints.books}`, {
        params: { filters: filter, rating: raitingFilter }
      });
    },
    {
      select(data) {
        return data.data;
      },
      onError() {
        toast({ variant: 'destructive', title: 'Uh oh! Something went wrong.' });
      }
    }
  );

  return {
    isLoading,
    isError,
    books,
    isFetching,
    refetch,
    error,
    isRefetching
  };
};

export const useBookByIdApi = (id: string) => {
  const {
    isLoading,
    isError,
    data: book,
    isFetching,
    refetch
  } = useQuery(
    `${endpoints.books}/${id}`,
    () => {
      return $axios.get<BookScheme>(`${endpoints.books}/${id}`);
    },
    {
      select(data) {
        return data.data;
      },
      onError() {
        toast({ variant: 'destructive', title: 'Uh oh! Something went wrong.' });
      }
    }
  );

  return {
    isLoading,
    isError,
    book,
    isFetching,
    refetch
  };
};

export const useCreateBookApi = () => {
  const { isLoading, isError, isSuccess, mutate, data } = useMutation(
    `${endpoints.books}-create`,
    (book: Pick<BookScheme, 'title' | 'author'>) => {
      return $axios.post<BookScheme>(endpoints.books, book);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: endpoints.books });
      },
      onError() {
        toast({ variant: 'destructive', title: 'Uh oh! Something went wrong.' });
      }
    }
  );

  return {
    isError,
    isLoading,
    isSuccess,
    createBook: mutate,
    data
  };
};

export const useEditBookApi = (id: string) => {
  const { isLoading, isError, isSuccess, mutate, data } = useMutation(
    `${endpoints.books}-edit/${id}`,
    (book: Partial<BookScheme>) => {
      return $axios.patch<BookScheme>(`${endpoints.books}/${id}`, book);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: endpoints.books });
      },
      onError() {
        toast({ variant: 'destructive', title: 'Uh oh! Something went wrong.' });
      }
    }
  );

  return {
    isError,
    isLoading,
    isSuccess,
    editBook: mutate,
    data
  };
};

export const useDeleteBookApi = (id: string) => {
  const { isLoading, isError, isSuccess, mutate, data } = useMutation(
    `${endpoints.books}-delete/${id}`,
    () => {
      return $axios.delete<BookScheme>(`${endpoints.books}/${id}`);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: endpoints.books });
      },
      onError() {
        toast({ variant: 'destructive', title: 'Uh oh! Something went wrong.' });
      }
    }
  );

  return {
    isError,
    isLoading,
    isSuccess,
    deleteBook: mutate,
    data
  };
};
