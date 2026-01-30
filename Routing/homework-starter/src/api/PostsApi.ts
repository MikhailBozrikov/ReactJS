import { IPost, Posts } from "../models";
import { BASE_URL } from "./config";
import { fetchWithRetry } from "./utils/fetchWithTimeout";

export const getPosts = async (): Promise<Posts> => {
  try {
    const url = `${BASE_URL}/posts`;
    const response = await fetchWithRetry(url, {}, 1, 3000);
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn('Using fallback posts data:', errorMessage);
    return [
      { 
        userId: 1, 
        id: 1, 
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", 
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto" 
      },
      { 
        userId: 1, 
        id: 2, 
        title: "qui est esse", 
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla" 
      }
    ];
  }
};

export const getPost = async (postId: string): Promise<IPost> => {
  try {
    const url = `${BASE_URL}/posts/${postId}`;
    const response = await fetchWithRetry(url, {}, 1, 3000);
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn(`Using fallback post ${postId}:`, errorMessage);
    return {
      userId: 1,
      id: parseInt(postId),
      title: "Fallback Post",
      body: "This is fallback content due to network issues."
    };
  }
};