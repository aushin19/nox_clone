
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface TestimonialRatingProps {
  rating: number;
  className?: string;
}

const TestimonialRating = ({ rating, className = "" }: TestimonialRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className={`flex items-center ${className}`}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 fill-primary text-primary" />
      ))}
      
      {/* Half star */}
      {hasHalfStar && <StarHalf className="h-5 w-5 fill-primary text-primary" />}
      
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-muted" />
      ))}
    </div>
  );
};

export default TestimonialRating;
