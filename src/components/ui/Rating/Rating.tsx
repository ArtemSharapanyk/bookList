import React, { useState, FC, useEffect } from 'react';
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';
import { calculateStarState } from './helpers';

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
    const startedStarsState = -1;
    if (!rating) {
      return setActiveStar(startedStarsState);
    }

    const starsStatesFromRating = rating / 2;

    setActiveStar(starsStatesFromRating);
  }, []);

  return (
    <div className="flex relative cursor-pointer text-left">
      {mockArray.map((element, index) => {
        const { showEmptyIcon, showRatingWithPrecision, activeState } = calculateStarState(
          activeStar,
          index
        );

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
