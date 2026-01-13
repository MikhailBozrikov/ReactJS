import { useEffect, useState } from "react";
import { IBestEmployees } from "../../api.ts";
import "./styles.css";

interface IBestEmployeesData {
  getApi: () => Promise<IBestEmployees>;
}

export const BestEmployees = ({ getApi }: IBestEmployeesData) => {
  const [employees, setEmployees] = useState<IBestEmployees | null>(null);
  useEffect(() => {
    getApi().then((res) => setEmployees(res));
  }, [getApi]);

  return (
    employees && (
      <div className="container">
        <h2>Best employee of the year</h2>
        <img src={employees.image} width={400} height={400} alt="" />
        <p>
          {employees.name}: {employees.position}
        </p>
      </div>
    )
  );
};
