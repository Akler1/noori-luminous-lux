import { useState, useEffect } from "react";
import { Star, ThumbsUp, Verified } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { getProductData, JudgeMeReview } from "@/lib/judgeme";

interface ReviewsStubProps {
  productHandle: string;
  className?: string;
}

const renderStars = (rating: number) =>
  [...Array(5)].map((_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${i < rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
    />
  ));

export const ReviewsStub = ({ productHandle, className = "" }: ReviewsStubProps) => {
  const [reviews, setReviews] = useState<JudgeMeReview[]>([]);
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productHandle) return;
    setLoading(true);
    getProductData(productHandle)
      .then((data) => {
        setRating(data.rating);
        setTotalReviews(data.reviews_count);
        setReviews(data.reviews);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [productHandle]);

  const displayed = showAll ? reviews : reviews.slice(0, 2);
  const averageRating = rating;

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h3 className="font-display text-2xl font-normal mb-4">Customer Reviews</h3>

        {loading ? (
          <div className="text-muted-foreground text-sm">Loading reviews…</div>
        ) : totalReviews === 0 ? (
          <div className="text-muted-foreground text-sm">No reviews yet — be the first!</div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-display font-normal text-accent mb-1">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center mb-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Individual Reviews */}
      {!loading && displayed.length > 0 && (
        <div className="space-y-6">
          {displayed.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
            >
              <Card className="card-luxury p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.reviewer.avatar} />
                        <AvatarFallback>
                          {review.reviewer.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.reviewer.name}</span>
                          {review.reviewer.verified_buyer && (
                            <Badge variant="secondary" className="text-xs">
                              <Verified className="h-3 w-3 mr-1" />
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">{renderStars(review.rating)}</div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    {review.title && <h4 className="font-medium">{review.title}</h4>}
                    <p className="text-muted-foreground leading-relaxed">{review.body}</p>
                  </div>

                  {/* Review photos */}
                  {review.pictures.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {review.pictures.map((pic, i) => (
                        <img
                          key={i}
                          src={pic.urls.small}
                          alt="Review photo"
                          className="h-16 w-16 rounded-md object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Show more / less */}
      {!loading && reviews.length > 2 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="btn-ghost-luxury"
          >
            {showAll ? "Show Less" : `View All ${totalReviews} Reviews`}
          </Button>
        </div>
      )}

      {/* Write a review — links to Judge.me hosted form */}
      <div className="text-center bg-muted/30 rounded-xl p-8">
        <h4 className="font-display text-xl font-normal mb-2">Share Your Experience</h4>
        <p className="text-muted-foreground mb-4">
          Help others discover the perfect piece by sharing your review
        </p>
        <Button className="btn-hero" asChild>
          <a
            href={`https://judge.me/shop/${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/products/${productHandle}/reviews/new`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Write a Review
          </a>
        </Button>
      </div>
    </div>
  );
};
