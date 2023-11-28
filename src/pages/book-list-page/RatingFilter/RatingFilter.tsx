import React, { FC, useEffect, useState } from 'react';

const mockArray = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<number | null>>;
  filterStatus: number | null;
}

// multiply the index by 2, because 1 star = 2 ratings,

export const RatingFilter: FC<Props> = ({ setFilter, filterStatus }) => {
  const [rating, setRating] = useState(filterStatus ? filterStatus / 2 : 0);
  const [hover, setHover] = useState(0);

  const handleClick = (index: number) => () => {
    setRating(index);
    setFilter(index * 2);
  };

  const handleMouseEnter = (index: number) => () => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  useEffect(() => {
    if (filterStatus !== rating * 2) {
      setRating(0);
      setHover(0);
    }
  }, [filterStatus, rating]);

  return (
    <div className="star-rating">
      {mockArray.map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={star}
            className={index <= (hover || rating) ? 'text-[#000]' : 'text-[#ccc]'}
            onClick={handleClick(index)}
            onMouseEnter={handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}>
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
