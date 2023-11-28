import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BooksListPage } from '../../pages/book-list-page/BooksListPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <BooksListPage />
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={routes} />;
};
