import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from '../api/restaurants';
import { Restaurant } from '../types/types';

export const useRestaurantList = () => {
  return useQuery<Restaurant[]>({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
    staleTime: 5 * 60 * 1000, 
  });
}