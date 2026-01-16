const API_URL = "http://localhost:3000";

export interface ITeam {
  name: string;
  position: string;
  image: string;
}
export interface IData {
  profit: number[];
  team: ITeam[];
}

export interface IBestEmployees {
  id: string;
  name: string;
  position: string;
  image: string;
}

// Функция для получения основных данных (прибыль и команда)
export const fetchData = (): Promise<IData> =>
  fetch(`${API_URL}/data`).then((res) => res.json());

// Функция для получения данных о лучшем сотруднике за конкретный год
export const fetchBestEmployeesData = (id: number): Promise<IBestEmployees> =>
  fetch(`${API_URL}/bestEmployees/${id}`).then((res) => res.json());