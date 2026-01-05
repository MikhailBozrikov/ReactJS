const API_URL = 'http://localhost:3000';

// Получение списка ресторанов
export const getRestaurants = async () => {
  const response = await fetch(`${API_URL}/restaurants`);
  if (!response.ok) throw new Error('Failed to fetch restaurants');
  return response.json();
}

// Обновление рейтинга ресторана
export const updateRestaurantRating = async (restaurantId: string, rating: number) => {
  const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating }),
  });
  
  if (!response.ok) throw new Error('Failed to update rating');
  return response.json();
}