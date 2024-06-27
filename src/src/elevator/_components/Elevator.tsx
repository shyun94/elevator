import { CSSProperties, memo } from "react";
import { ElevatorState } from "../_type/elevatorState";
import { floors } from "../floor/consts/floors";
import { useInterval } from "../../utils/hooks/useInterval";

interface Props {
  elevator: ElevatorState;
  updateElevatorState: (newElevatorState: ElevatorState) => void;
}

export const ElevatorComponent = memo(
  ({ elevator, updateElevatorState }: Props) => {
    useInterval(
      () => {
        if (elevator.status === "STOP") return;

        if (elevator.currentFloor < elevator.targetFloor!) {
          updateElevatorState({
            ...elevator,
            currentFloor: elevator.currentFloor + 1,
          });
        }
        if (elevator.currentFloor > elevator.targetFloor!) {
          updateElevatorState({
            ...elevator,
            currentFloor: elevator.currentFloor - 1,
          });
        }
        if (elevator.currentFloor === elevator.targetFloor) {
          updateElevatorState({
            ...elevator,
            status: "STOP",
            targetFloor: undefined,
          });
        }
      },
      { delay: 1000, run: elevator.status === "RUN" }
    );
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
  }
);

const movingElevatorStyle: CSSProperties = {
  color: "red",
  border: "1px solid red",
};

const elevatorStyle: CSSProperties = {
  color: "blue",
  border: "1px solid blue",
};
