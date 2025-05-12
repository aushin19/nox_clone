
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialRatingProps {
  rating: number;
  className?: string;
}

const TestimonialRating = ({ rating, className = "" }: TestimonialRatingProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={`h-4 w-4 ${star <= rating ? "fill-primary text-primary" : "text-muted"}`}
        />
      ))}
    </div>
  );
};

export default TestimonialRating;
