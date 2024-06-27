import { CSSProperties } from "react";
import { Direction } from "../../_type/elevatorState";
import { floors } from "../consts/floors";

interface Props {
  clickedButtons: {
    floor: number;
    direction: Direction;
  }[];
  clickFloorButton: (floor: number, direction: Direction) => void;
}

export const FloorButtons = ({ clickedButtons, clickFloorButton }: Props) => {
  return (
    <div style={wrapperStyle}>
      {floors.map((floor) => (
        <div key={`floor-buttons-${floor}`} style={floorButtonsStyle}>
          {floor}
          <button
            style={
              clickedButtons.some(
                (clickedButton) =>
                  clickedButton.floor === floor &&
                  clickedButton.direction === "UP"
              )
                ? { ...buttonStyle, ...clickedButtonStyle }
                : buttonStyle
            }
            disabled={floor === floors[floors.length - 1]}
            onClick={() => clickFloorButton(floor, "UP")}
          >
            ⬆️
          </button>
          <button
            style={
              clickedButtons.some(
                (clickedButton) =>
                  clickedButton.floor === floor &&
                  clickedButton.direction === "DOWN"
              )
                ? { ...buttonStyle, ...clickedButtonStyle }
                : buttonStyle
            }
            disabled={floor === floors[0]}
            onClick={() => clickFloorButton(floor, "DOWN")}
          >
            ⬇️
          </button>
        </div>
      ))}
      호출
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
};

const buttonStyle: CSSProperties = {
  border: "none",
  cursor: "pointer",
};

const clickedButtonStyle: CSSProperties = {
  backgroundColor: "blue",
  color: "white",
};
