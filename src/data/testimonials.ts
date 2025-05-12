
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp Inc.",
    rating: 5,
    content: "This platform has completely transformed our marketing strategy. The tools are intuitive and the analytics provide deep insights that have helped us increase our ROI by 40% in just three months.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Growth Lead",
    company: "StartupVision",
    rating: 4.5,
    content: "I've tried numerous marketing tools, but this one stands above the rest. The customer segmentation feature has been a game-changer for our targeted campaigns.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "E-commerce Manager",
    company: "RetailPlus",
    rating: 5,
    content: "The integration capabilities with our existing systems made implementation a breeze. Our team was fully operational within days, not weeks. The ROI has been incredible.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  }
];

