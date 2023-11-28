import React, { FC } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '../../../components/ui/Card/Card';

import { Button } from '../../../components/ui/Button/Button';
import { BookScheme } from '../../../api/books/BookScheme';
import { useDeleteBookApi } from '../../../api/books/booksApi';
import { EditBookModal } from '../EditBookModal/EditBookModal';
import { Rating } from '../../../components/ui/Rating/Rating';

interface Props extends Omit<BookScheme, 'notes'> {}

export const BookCard: FC<Props> = ({ completion_status, author, rating, title, _id }) => {
  const { isLoading, deleteBook } = useDeleteBookApi(_id);

  const deleteBookHandler = () => {
    deleteBook();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Book author: <span className="text-[#000]">{author}</span>
          {rating && completion_status === 'read' ? (
            <Rating rating={rating} />
          ) : (
            <div className="h-[20px]" />
          )}
          {completion_status === 'read' ? 'read' : <div className="h-[20px]" />}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <EditBookModal id={_id} />
        <Button onClick={deleteBookHandler} disabled={isLoading} variant="destructive">
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};
