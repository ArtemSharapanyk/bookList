import React, { FC } from 'react';
import { Button } from '../../../components/ui/Button/Button';
import { queryClient } from '../../../api/config';
import { endpoints } from '../../../api/endpoints';

type Filters = 'all' | 'not_read_yet' | 'read';

const bookFilters = [
  {
    name: 'All',
    filter: 'all'
  },
  {
    name: 'Read',
    filter: 'read'
  },
  {
    name: 'Not read yet',
    filter: 'not_read_yet'
  }
];

interface Props {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filter: Filters;
}
export const BookFilters: FC<Props> = ({ setFilters, filter: filterState }) => {
  const handleFilters = (filter: Filters) => async () => {
    setFilters(filter);
    queryClient.refetchQueries(endpoints.books);
  };

  return (
    <div className="book-filters flex items-center">
      {bookFilters.map((filter) => (
        <div key={filter.name} className="filters__element mr-1">
          <Button
            variant={filterState === filter.filter ? 'default' : 'ghost'}
            onClick={handleFilters(filter.filter as Filters)}>
            {filter.name}
          </Button>
        </div>
      ))}
    </div>
  );
};
