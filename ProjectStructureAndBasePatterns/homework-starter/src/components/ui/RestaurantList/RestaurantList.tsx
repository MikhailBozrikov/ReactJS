import './styles.css'
import { Restaurant } from '../../../types/types'
import { RestaurantCard } from '../RestaurantCard/RestaurantCard'

type RestaurantListProps = {
  restaurants: Restaurant[];
  onRatingChange?: (restaurantId: string, rating: number) => void;
}

export const RestaurantList = ({ restaurants, onRatingChange }: RestaurantListProps) => {
  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <RestaurantCard 
          key={restaurant.id} 
          restaurant={restaurant} 
          onRatingChange={onRatingChange}
        />
      ))}
    </div>
  )
}