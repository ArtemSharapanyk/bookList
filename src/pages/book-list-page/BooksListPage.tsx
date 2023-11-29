import React from 'react';
import { BookList } from './BookList/BookList';
import { ErrorBoundary } from '../../components/error/ErrorBoundary';

export const BooksListPage = () => {
  return (
    <ErrorBoundary>
      <BookList />
    </ErrorBoundary>
  );
};
