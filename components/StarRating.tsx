import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface StarRatingProps {
    rating: number | null;
    onRatingChange: (rating: number) => void;
}

const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    return (
        <label className="flex items-center gap-1">
            <span>Rating:</span>
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                    const filled =
                        (hoverRating !== null && star <= hoverRating) ||
                        (hoverRating === null &&
                            rating !== null &&
                            star <= rating);

                    return (
                        <button
                            key={star}
                            type="button"
                            onClick={() => onRatingChange(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="text-accent-accent hover:scale-110 transition-transform mt-1"
                            aria-label={`Rate ${star} stars`}
                        >
                            {filled ? (
                                <FaStar className="w-6 h-6" />
                            ) : (
                                <FaRegStar className="w-6 h-6" />
                            )}
                        </button>
                    );
                })}
            </div>
        </label>
    );
};

export default StarRating;
