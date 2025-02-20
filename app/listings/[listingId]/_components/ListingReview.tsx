"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type Review = {
  userName: string;
  rating: number;
  comment: string;
};

type ListingReviewProps = {
  listingId: string;
  currentUser?: { id: string; name?: string | null };
};



const ListingReview: React.FC<ListingReviewProps> = ({ listingId, currentUser }) => {
  const [reviews, setReviews] = useState<Review[]>([
    { userName: "Ravi Kumar", rating: 5, comment: "Amazing stay! Highly recommend." },
    { userName: "Ananya Sharma", rating: 4, comment: "Great place, but a bit pricey." },
  ]);
  const [newRating, setNewRating] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>("");

  const handleAddReview = () => {
    if (newRating === 0 || newComment.trim() === "") return;

    const newReview: Review = {
      userName: currentUser?.name || "Anonymous User",
      rating: newRating,
      comment: newComment,
    };

    setReviews([...reviews, newReview]);
    setNewRating(0);
    setNewComment("");
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-semibold">Reviews & Ratings</h2>
      <p className="text-gray-500">Reviews for listing ID: {listingId}</p>

      {/* Existing Reviews */}
      <div className="mt-4 space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-semibold">{review.userName}</h3>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
              ))}
            </div>
            <p className="mt-2 text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Add New Review */}
      {currentUser && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Leave a Review</h3>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setNewRating(star)}>
                <Star size={24} className={star <= newRating ? "text-yellow-500" : "text-gray-300"} />
              </button>
            ))}
          </div>
          <textarea
            className="w-full mt-2 p-2 border rounded-lg"
            placeholder="Write your review here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleAddReview}>
            Submit Review
          </button>
        </div>
      )}
      {!currentUser && <p className="text-red-500 mt-4">You must be logged in to leave a review.</p>}
    </div>
  );
};

export default ListingReview;
