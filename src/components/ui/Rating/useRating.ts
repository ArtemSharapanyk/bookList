import React, { useEffect, useRef, useState } from 'react';

const precision = 0.5;
const totalStars = 5;

export const useRatingAction = (
  // eslint-disable-next-line no-unused-vars
  handleAction: (rating: number) => void,
  parentRating: number | null
) => {
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
    const rating = activeStar * 2;
    setActiveStar(activeStar);
    handleAction(rating);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsHovered(true);
    setHoverActiveStar(calculateRating(e));
  };

  const handleMouseLeave = () => {
    setHoverActiveStar(-1);
    setIsHovered(false);
  };

  useEffect(() => {
    if (parentRating !== activeStar * 2) {
      setActiveStar(-1);
      setIsHovered(false);
    }
  }, [parentRating, activeStar]);

  return {
    activeStar,
    hoverActiveStar,
    isHovered,
    handleClick,
    handleMouseMove,
    ratingContainerRef,
    handleMouseLeave
  };
};
