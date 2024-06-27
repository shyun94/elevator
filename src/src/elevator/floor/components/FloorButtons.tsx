import { floors } from "../consts/floors";

export const FloorButtons = () => {
  return (
    <div>
      {floors.map((floor, index) => (
        <button key={index}>{floor}</button>
      ))}
    </div>
  );
};
