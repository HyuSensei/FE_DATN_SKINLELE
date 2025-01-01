export const calculatePercentageReview = (averageRating, maxRating = 5) => {
  if (averageRating < 0 || averageRating > maxRating) {
    return 0;
  }
  return (averageRating / maxRating) * 100;
};
