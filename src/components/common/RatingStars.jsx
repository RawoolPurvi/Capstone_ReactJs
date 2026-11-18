import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({
  rating = 5,
  maxStars = 5,
  interactive = false,
  onChange = () => {},
  size = 14,
  className = '',
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = interactive
          ? starValue <= (hoverRating || rating)
          : starValue <= rating;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} focus:outline-none`}
          >
            <Star
              size={size}
              className={`${
                isFilled
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-zinc-600 fill-transparent'
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
