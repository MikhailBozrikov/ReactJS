import { Todos } from "../models";
import { BASE_URL } from "./config";
import { fetchWithRetry } from "./utils/fetchWithTimeout";

export const getTodos = async (): Promise<Todos> => {
  try {
    const url = `${BASE_URL}/users/1/todos`;
    const response = await fetchWithRetry(url, {}, 1, 3000);
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn('Using fallback todos data:', errorMessage);
    return [
      { userId: 1, id: 1, title: "delectus aut autem", completed: false },
      { userId: 1, id: 2, title: "quis ut nam facilis et officia qui", completed: false },
      { userId: 1, id: 3, title: "fugiat veniam minus", completed: false }
    ];
  }
};