import { ITeam } from "../../api.ts";
import "./styles.css";

interface ITeamData {
  team: ITeam[];
}
export const Team = ({ team }: ITeamData) => {
  return (
    <>
      <h2>Our Team</h2>
      <div className="component">
        {team.map(({ name, position, image }) => (
          <div key={name}>
            <img src={image} width={300} height={300} alt="" />
            <p>
              {name}: {position}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
