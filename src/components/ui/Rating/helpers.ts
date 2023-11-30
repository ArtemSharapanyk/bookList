export const calculateStarState = (activeStar: number, index: number) => {
  const activeState = activeStar;

  const showEmptyIcon = activeState === -1 || activeState < index + 1;

  const isActiveRating = activeState !== 1;
  const isRatingWithPrecision = activeState % 1 !== 0;
  const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
  const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

  return {
    showRatingWithPrecision,
    showEmptyIcon,
    activeState
  };
};

export const calculateStarStateWithAction = ({
  activeStar,
  index,
  isHovered,
  hoverActiveStar
}: {
  activeStar: number;
  index: number;
  isHovered: boolean;
  hoverActiveStar: number;
}) => {
  const activeState = isHovered ? hoverActiveStar : activeStar;

  const showEmptyIcon = activeState === -1 || activeState < index + 1;

  const isActiveRating = activeState !== 1;
  const isRatingWithPrecision = activeState % 1 !== 0;
  const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
  const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;
  return {
    showRatingWithPrecision,
    showEmptyIcon,
    activeState
  };
};
