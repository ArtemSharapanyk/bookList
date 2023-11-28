import React from 'react';
import { CreateBookModal } from '../../pages/book-list-page/CreateBookModal/CreateBookModal';

export const Header = () => {
  return (
    <div className="header flex justify-between items-center py-4">
      <div className="header__logo font-bold">Book List</div>
      <CreateBookModal />
    </div>
  );
};
