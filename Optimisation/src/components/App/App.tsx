import { useEffect, useMemo, useState, useCallback } from "react";
import { fetchBestEmployeesData, fetchData, IData } from "../../api";
import { BestEmployees } from "../BestEmployees/BestEmployees";
import { Team } from "../Team/Team";
import "./styles.css";

function App() {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const [data, setData] = useState<IData>();

  // Загрузка данных только при монтировании компонента
  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  const { profit = [], team = [] } = data || {};

  // Вычисляет сумму всех элементов массива profit.
  const profitSum = useMemo(() =>
    profit.reduce((acc, i) => acc + i, 0),
    [profit]
  );

  // Вычисляет доход на количество месяцев.
  const calculateProfitSum = useMemo(() =>
    month * profitSum,
    [month, profitSum]
  );

  // Форматированная дата в формате "месяц/год".
  const date = useMemo(() => `${month}/${year}`, [month, year]);

  // Функция для получения лучшего сотрудника за выбранный год.
  const getApi = useCallback(() =>
    fetchBestEmployeesData(year),
    [year]
  );

  // Увеличивает месяц с зацикливанием
  const onIncMonth = useCallback(() =>
    setMonth((count) => (count === 12 ? 1 : count + 1)),
    []
  );

  // Уменьшает год с ограничением до 2018.
  const onDecYear = useCallback(() =>
    setYear((count) => (count === 2018 ? 2018 : count - 1)),
    []
  );

  return (
    <div>
      <h1>App</h1>
      <div className="buttons">
        <button onClick={onIncMonth}>month is {month}</button>
        <button onClick={onDecYear}>year is {year}</button>
      </div>
      <div className="block">
        <p>Date is: {date}</p>
        <p>Profit sum is: {calculateProfitSum} $</p>
      </div>
      <BestEmployees getApi={getApi} />
      <Team team={team} />
    </div>
  );
}

export default App;