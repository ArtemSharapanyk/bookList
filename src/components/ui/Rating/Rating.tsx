import React, { useState, FC, useEffect } from 'react';
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';

const emptyIcon = MdOutlineStarBorder;
const filledIcon = MdOutlineStar;
const mockArray = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

interface Props {
  rating: number;
}

export const Rating: FC<Props> = ({ rating }) => {
  const [activeStar, setActiveStar] = useState(-1);

  const EmptyIcon = emptyIcon;
  const FilledIcon = filledIcon;

  useEffect(() => {
    if (!rating) {
      return setActiveStar(-1);
    }

    setActiveStar(rating / 2);
  }, []);

  return (
    <div className="flex relative cursor-pointer text-left">
      {mockArray.map((element, index) => {
        const activeState = activeStar;

        const showEmptyIcon = activeState === -1 || activeState < index + 1;

        const isActiveRating = activeState !== 1;
        const isRatingWithPrecision = activeState % 1 !== 0;
        const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
        const showRatingWithPrecision =
          isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

        return (
          <div className="relative cursor-pointer" key={element}>
            <div
              className="overflow-hidden absolute"
              style={{ width: showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%' }}>
              <FilledIcon />
            </div>

            <div className={`text-[${showEmptyIcon ? 'gray' : 'inherit'}]`}>
              {showEmptyIcon ? <EmptyIcon className="image" /> : <FilledIcon className="image" />}
            </div>
          </div>
        );
      })}
    </div>
  );
};