import React, { useState, useRef, FC, useEffect } from 'react';
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';

const precision = 0.5;
const totalStars = 5;
const emptyIcon = MdOutlineStarBorder;
const filledIcon = MdOutlineStar;

const mockArray = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<number | null>>;
  filterStatus: number | null;
}

export const RatingWithAction: FC<Props> = ({ filterStatus, setFilter }) => {
  const [activeStar, setActiveStar] = useState(-1);
  const [hoverActiveStar, setHoverActiveStar] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const ratingContainerRef = useRef<HTMLDivElement>(null);

  const calculateRating = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // @ts-ignore
    const { width, left } = ratingContainerRef?.current?.getBoundingClientRect();
    const percent = (e.clientX - left) / width;
    const numberInStars = percent * totalStars;
    const nearestNumber = Math.round((numberInStars + precision / 2) / precision) * precision;

    return Number(nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsHovered(false);
    const activeStar = calculateRating(e);
    setActiveStar(activeStar);
    setFilter(activeStar * 2);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsHovered(true);
    setHoverActiveStar(calculateRating(e));
  };

  const handleMouseLeave = () => {
    setHoverActiveStar(-1);
    setIsHovered(false);
  };
  const EmptyIcon = emptyIcon;
  const FilledIcon = filledIcon;

  useEffect(() => {
    if (filterStatus !== activeStar * 2) {
      setActiveStar(-1);
      setIsHovered(false);
    }
  }, [filterStatus, activeStar]);

  return (
    <div
      className="inline-flex relative cursor-pointer text-left"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ratingContainerRef}>
      {mockArray.map((element, index) => {
        const activeState = isHovered ? hoverActiveStar : activeStar;

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
