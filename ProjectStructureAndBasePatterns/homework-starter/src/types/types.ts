export type Restaurant = {
  id: string;
  name: string;
  cuisine: string; // Текстовое описание кухни и рейтинга
  rating: number; // Используется только для внутренней логики компонента звезд
  image: string;
  reviewsCount: number;
}

export type RatingUpdate = {
  restaurantId: string;
  rating: number; // Для отправки на сервер (значение от 1 до 5)
}