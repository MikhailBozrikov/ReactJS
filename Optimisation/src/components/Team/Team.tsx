import { ITeam } from "../../api";
import "./styles.css";
import { memo, useMemo } from "react";

interface ITeamData {
  team: ITeam[];
}

// Компонент для отображения всех членов команды.
export const Team = memo(({ team }: ITeamData) => {
  // Создаем стабильный массив React-элементов для рендера.
  const teamElements = useMemo(() =>
    team.map(({ name, position, image }) => (
      <div key={name}>
        <img src={image} width={300} height={300} alt={name} />
        <p>
          {name}: {position}
        </p>
      </div>
    )),
    [team]
  );

  return (
    <>
      <h2>Our Team</h2>
      <div className="component">
        {teamElements}
      </div>
    </>
  );
});