import React from 'react';
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';
import { testimonials } from '@/data/testimonials';

// Convert the existing testimonials to the new format
const formattedTestimonials = testimonials.map(testimonial => ({
  author: {
    name: testimonial.name,
    handle: `@${testimonial.company.toLowerCase().replace(/\s+/g, '')}`,
    avatar: testimonial.image
  },
  text: testimonial.content,
  // You can add href if you want to link to a Twitter/social media profile
  href: undefined
}));

const TestimonialsMarquee = () => {
  return (
    <TestimonialsSection
      title="Hear It from Those Who Matter Most"
      description="Our customers share their experiences and results after using our platform"
      testimonials={formattedTestimonials}
    />
  );
};

export default TestimonialsMarquee; 