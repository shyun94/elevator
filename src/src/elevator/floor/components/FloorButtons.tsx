import { CSSProperties } from "react";
import { Direction } from "../../_type/elevatorState";
import { floors } from "../consts/floors";

interface Props {
  disabled: boolean;
  selectFloor: (floor: number, direction: Direction) => void;
}

export const FloorButtons = ({ disabled, selectFloor }: Props) => {
  return (
    <div style={wrapperStyle}>
      {floors.map((floor) => (
        <div key={`buttons-${floor}`} style={floorButtonsStyle}>
          {floor}
          <button
            style={buttonStyle}
            key={floor}
            disabled={disabled}
            onClick={() => selectFloor(floor, "UP")}
          >
            ⬆️
          </button>
          <button
            style={buttonStyle}
            key={floor}
            disabled={disabled}
            onClick={() => selectFloor(floor, "DOWN")}
          >
            ⬇️
          </button>
        </div>
      ))}
    </div>
  );
};

const wrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column-reverse",
  gap: "10px",
};

const floorButtonsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid black",
  borderRadius: "5px",
  height: "24px",
};

const buttonStyle: CSSProperties = {
  width: "24px",
  height: "24px",
  padding: "0",
  margin: "0",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
};
