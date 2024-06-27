import { floors } from "../consts/floors";

interface Props {
  disabled: boolean;
}

export const FloorButtons = ({ disabled }: Props) => {
  return (
    <div>
      {floors.map((floor, index) => (
        <button key={index} disabled={disabled}>
          {floor}
        </button>
      ))}
    </div>
  );
};
