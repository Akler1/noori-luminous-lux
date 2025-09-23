import { useState } from "react";
import { Star, ThumbsUp, Verified } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  images?: string[];
  variant?: {
    metal: string;
    cut?: string;
    size?: string;
  };
}

interface ReviewsStubProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
  className?: string;
}

export const ReviewsStub = ({ 
  productId, 
  averageRating = 5, 
  totalReviews = 124,
  className = ""
}: ReviewsStubProps) => {
  const [showAll, setShowAll] = useState(false);

  // Mock reviews data - in production, this would come from reviews API
  const mockReviews: Review[] = [
    {
      id: "1",
      author: {
        name: "Sarah M.",
        verified: true
      },
      rating: 5,
      title: "Absolutely stunning quality",
      content: "These earrings are everything I hoped for and more. The lab-grown diamonds have incredible sparkle and the craftsmanship is flawless. I love that they're ethical too - exactly what I was looking for in modern luxury jewelry.",
      date: "2024-01-15",
      helpful: 12,
      variant: {
        metal: "14K Gold",
        cut: "Round Brilliant"
      }
    },
    {
      id: "2", 
      author: {
        name: "Emma K.",
        verified: true
      },
      rating: 5,
      title: "Perfect everyday elegance",
      content: "I wear these every single day. They're the perfect size - noticeable but not overwhelming. The quality is exceptional and I've gotten so many compliments. Worth every penny.",
      date: "2024-01-10",
      helpful: 8,
      variant: {
        metal: "Sterling Silver",
        cut: "Round Brilliant"
      }
    },
    {
      id: "3",
      author: {
        name: "Jessica L.",
        verified: true
      },
      rating: 5,
      title: "Ethical luxury at its finest",
      content: "Finally found a jewelry brand that aligns with my values without compromising on beauty. The diamonds are identical to mined ones but with a clear conscience. The packaging was also beautiful - perfect gift presentation.",
      date: "2024-01-08",
      helpful: 15,
      variant: {
        metal: "9K Gold",
        cut: "Princess"
      }
    }
  ];

  const displayedReviews = showAll ? mockReviews : mockReviews.slice(0, 2);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'
        }`}
      />
    ));
  };

  const ratingDistribution = [
    { stars: 5, count: 98, percentage: 79 },
    { stars: 4, count: 20, percentage: 16 },
    { stars: 3, count: 4, percentage: 3 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Reviews Header */}
      <div className="text-center">
        <h3 className="font-display text-2xl font-normal mb-4">
          Customer Reviews
        </h3>
        
        {/* Overall Rating */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-display font-normal text-accent mb-1">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center mb-1">
              {renderStars(averageRating)}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {totalReviews} reviews
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="max-w-sm mx-auto space-y-2">
          {ratingDistribution.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-2 text-sm">
              <span className="w-8 text-right">{rating.stars}</span>
              <Star className="h-3 w-3 fill-accent text-accent" />
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: `${rating.percentage}%` }}
                />
              </div>
              <span className="w-8 text-left text-muted-foreground">
                {rating.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {displayedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-luxury p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.author.avatar} />
                      <AvatarFallback>
                        {review.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.author.name}</span>
                        {review.author.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Verified className="h-3 w-3 mr-1" />
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="space-y-2">
                  <h4 className="font-medium">{review.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {review.content}
                  </p>
                </div>

                {/* Variant Info */}
                {review.variant && (
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {review.variant.metal}
                    </Badge>
                    {review.variant.cut && (
                      <Badge variant="outline" className="text-xs">
                        {review.variant.cut}
                      </Badge>
                    )}
                    {review.variant.size && (
                      <Badge variant="outline" className="text-xs">
                        {review.variant.size}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {mockReviews.length > 2 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(!showAll)}
            className="btn-ghost-luxury"
          >
            {showAll ? 'Show Less' : `View All ${totalReviews} Reviews`}
          </Button>
        </div>
      )}

      {/* Write Review CTA */}
      <div className="text-center bg-muted/30 rounded-xl p-8">
        <h4 className="font-display text-xl font-normal mb-2">
          Share Your Experience
        </h4>
        <p className="text-muted-foreground mb-4">
          Help others discover the perfect piece by sharing your review
        </p>
        <Button className="btn-hero">
          Write a Review
        </Button>
      </div>
    </div>
  );
};