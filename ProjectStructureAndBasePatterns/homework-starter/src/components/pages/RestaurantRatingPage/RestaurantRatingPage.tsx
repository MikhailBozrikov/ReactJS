import './styles.css'
import { useState } from 'react'
import { useRestaurantList } from '../../../hooks/useRestaurantList'
import { updateRestaurantRating } from '../../../api/restaurants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import { SearchInput } from '../../ui/SearchInput/SearchInput'
import { RestaurantList } from '../../ui/RestaurantList/RestaurantList'

export const RestaurantRatingPage = () => {
  useDocumentTitle('Restaurant Rating')
  
  const { data: restaurants = [], isLoading, error } = useRestaurantList()
  const [searchQuery, setSearchQuery] = useState('')
  const queryClient = useQueryClient()

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const updateRatingMutation = useMutation({
    mutationFn: ({ restaurantId, rating }: { restaurantId: string; rating: number }) =>
      updateRestaurantRating(restaurantId, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] })
    },
  })

  const handleRatingChange = (restaurantId: string, rating: number) => {
    updateRatingMutation.mutate({ restaurantId, rating })
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading restaurants...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading restaurants. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="restaurant-rating-page">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search for restaurants"
      />
      <RestaurantList
        restaurants={filteredRestaurants}
        onRatingChange={handleRatingChange}
      />
    </div>
  )
}