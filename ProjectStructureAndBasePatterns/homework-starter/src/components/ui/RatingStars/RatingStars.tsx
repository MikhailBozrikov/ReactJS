import './styles.css'

type RatingStarsProps = {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}

export const RatingStars = ({ rating, onRatingChange, interactive = false }: RatingStarsProps) => {
  const handleStarClick = (selectedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  }

  return (
    <div className={`rating-stars ${interactive ? 'interactive' : ''}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star-button ${star <= rating ? 'filled' : ''}`}
          onClick={() => handleStarClick(star)}
          disabled={!interactive}
          aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
        >
          <svg 
            className="star-icon"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
            fill={star <= rating ? "#FFD700" : "none"}
            stroke={star <= rating ? "#FFD700" : "#e0e0e0"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  )
}