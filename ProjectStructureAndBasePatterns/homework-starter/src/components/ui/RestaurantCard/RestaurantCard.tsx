import './styles.css'
import { Restaurant } from '../../../types/types'
import { RatingStars } from '../RatingStars/RatingStars'

type RestaurantCardProps = {
  restaurant: Restaurant;
  onRatingChange?: (restaurantId: string, rating: number) => void;
}

export const RestaurantCard = ({ restaurant, onRatingChange }: RestaurantCardProps) => {
  const handleRatingChange = (rating: number) => {
    if (onRatingChange) {
      onRatingChange(restaurant.id, rating);
    }
  }

  return (
    <div className="restaurant-card">
      <img 
        src={restaurant.image} 
        alt={restaurant.name} 
        className="restaurant-image" 
      />
      <div className="restaurant-info">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <p className="restaurant-cuisine">{restaurant.cuisine}</p>
        <RatingStars 
          rating={restaurant.rating} 
          onRatingChange={handleRatingChange}
          interactive={!!onRatingChange}
        />
      </div>
    </div>
  )
}