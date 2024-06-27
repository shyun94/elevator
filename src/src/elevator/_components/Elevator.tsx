import { floors } from "../floor/consts/floors";

export const ElevatorComponent = () => {
  return (
    <div>
      {floors.map((floor, index) => (
        <div key={index}>{floor}</div>
      ))}
    </div>
  );
};
