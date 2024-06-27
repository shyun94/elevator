import { CSSProperties } from "react";
import { ElevatorState } from "../_type/elevatorState";
import { floors } from "../floor/consts/floors";

interface Props {
  elevator: ElevatorState;
}

export const ElevatorComponent = ({ elevator }: Props) => {
  return (
    <div>
      {floors.map((floor, index) => (
        <div
          key={index}
          style={
            elevator.currentFloor === floor
              ? elevator.targetFloor
                ? movingElevatorStyle
                : elevatorStyle
              : undefined
          }
        >
          {floor}
        </div>
      ))}
    </div>
  );
};

const movingElevatorStyle: CSSProperties = {
  color: "red",
  border: "1px solid red",
};

const elevatorStyle: CSSProperties = {
  color: "blue",
  border: "1px solid blue",
};
