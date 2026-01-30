import { Albums, Photos } from "../models";
import { BASE_URL } from "./config";
import { fetchWithRetry } from "./utils/fetchWithTimeout";

export const getAlbums = async (): Promise<Albums> => {
  try {
    const url = `${BASE_URL}/users/1/albums`;
    const response = await fetchWithRetry(url, {}, 1, 3000);
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn('Using fallback albums data:', errorMessage);
    return [
      { userId: 1, id: 1, title: "quidem molestiae enim" },
      { userId: 1, id: 2, title: "sunt qui excepturi placeat culpa" },
      { userId: 1, id: 3, title: "omnis laborum odio" },
      { userId: 1, id: 4, title: "non esse culpa molestiae omnis sed optio" },
      { userId: 1, id: 5, title: "eaque aut omnis a" }
    ];
  }
};

export const getPhotos = async (albumId: number): Promise<Photos> => {
  try {
    const url = `${BASE_URL}/albums/${albumId}/photos`;
    const response = await fetchWithRetry(url, {}, 1, 3000);
    const data = await response.json();
    return data.slice(0, 10);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn(`Using fallback photos for album ${albumId}:`, errorMessage);
    return Array.from({ length: 10 }, (_, i) => ({
      albumId,
      id: i + 1,
      title: `accusamus beatae ad facilis cum similique qui sunt ${i + 1}`,
      url: `https://via.placeholder.com/600/92c952`,
      thumbnailUrl: `https://via.placeholder.com/150/92c952`
    }));
  }
};