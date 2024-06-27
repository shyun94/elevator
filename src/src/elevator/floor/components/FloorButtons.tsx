import { floors } from "../consts/floors";

interface Props {
  disabled: boolean;
  selectFloor: (floor: number) => void;
}

export const FloorButtons = ({ disabled, selectFloor }: Props) => {
  return (
    <div>
      {floors.map((floor) => (
        <button
          key={floor}
          disabled={disabled}
          onClick={() => selectFloor(floor)}
        >
          {floor}
        </button>
      ))}
    </div>
  );
};
