import React, { useState } from 'react';
import { useBooksApi } from '../../../api/books/booksApi';
import { Loader } from '../../../components/ui/Loader/Loader';
import { BookCard } from '../BookCard/BookCard';
import { BookFilters } from '../BookFilters/BookFilters';
import { Button } from '../../../components/ui/Button/Button';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/Alert/Alert';
import { RatingWithAction } from '../../../components/ui/Rating/RatingWithAction';

console.log('ss');

export const BookList = () => {
  const [filter, setFilter] = useState<'all' | 'read' | 'not_read_yet'>('all');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const { isLoading, books, isRefetching } = useBooksApi(filter, ratingFilter);

  const cleareFilters = () => {
    setFilter('all');
    setRatingFilter(null);
  };

  const isDataEmpty = !books?.length;
  const isDataLoading = isLoading || isRefetching;

  return (
    <div className="books-list">
      <div className="filter-panel flex justify-between items-center mb-4">
        <div className="flex">
          <BookFilters filter={filter} setFilters={setFilter} />
          <Button onClick={cleareFilters} variant="destructive">
            Clear filters
          </Button>
        </div>
        <RatingWithAction filterStatus={ratingFilter} setFilter={setRatingFilter} />
      </div>

      {isDataLoading ? (
        <Loader />
      ) : (
        <div className="books-list grid-layout">
          {isDataEmpty ? (
            <Alert>
              <AlertTitle>List empty!</AlertTitle>
              <AlertDescription>You can add book or clear your filters</AlertDescription>
            </Alert>
          ) : (
            books.map(({ author, completion_status, rating, title, _id }) => (
              <BookCard
                _id={_id}
                author={author}
                completion_status={completion_status}
                rating={rating}
                title={title}
                key={_id}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
