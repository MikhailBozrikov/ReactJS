import { useEffect, useState, memo } from "react";
import { IBestEmployees } from "../../api";
import "./styles.css";

interface IBestEmployeesData {
  getApi: () => Promise<IBestEmployees>;
}

// Компонент для отображения лучшего сотрудника выбранного года.
export const BestEmployees = memo(({ getApi }: IBestEmployeesData) => {
  const [employees, setEmployees] = useState<IBestEmployees | null>(null);
  
  // Загружаем данные при изменении getApi
  useEffect(() => {
    getApi().then((res) => setEmployees(res));
  }, [getApi]);

  return (
    employees && (
      <div className="container">
        <h2>Best employee of the year</h2>
        <img src={employees.image} width={400} height={400} alt={`Best employee: ${employees.name}`} />
        <p>
          {employees.name}: {employees.position}
        </p>
      </div>
    )
  );
});