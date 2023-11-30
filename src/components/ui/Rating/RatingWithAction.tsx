import React, { FC } from 'react';
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';
import { useRatingAction } from './useRating';
import { calculateStarStateWithAction } from './helpers';

const emptyIcon = MdOutlineStarBorder;
const filledIcon = MdOutlineStar;

const mockArray = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleAction: (rating: number) => void;
  parentRating: number | null;
}

export const RatingWithAction: FC<Props> = ({ parentRating, handleAction }) => {
  const {
    activeStar,
    handleClick,
    handleMouseLeave,
    handleMouseMove,
    isHovered,
    hoverActiveStar,
    ratingContainerRef
  } = useRatingAction(handleAction, parentRating);

  const EmptyIcon = emptyIcon;
  const FilledIcon = filledIcon;

  return (
    <div
      className="inline-flex relative cursor-pointer text-left"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ratingContainerRef}>
      {mockArray.map((element, index) => {
        const { activeState, showEmptyIcon, showRatingWithPrecision } =
          calculateStarStateWithAction({ activeStar, index, isHovered, hoverActiveStar });
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
