import { CSSProperties, memo } from "react";
import { ElevatorState, getRemovedTargetFloors } from "../_type/elevatorState";
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
        if (elevator.targetFloors.length === 0) {
          updateElevatorState({
            ...elevator,
            status: "STOP",
            direction: undefined,
          });
          return;
        }

        const targetFloor = elevator.targetFloors[0];
        if (elevator.currentFloor === targetFloor) {
          const newStates: ElevatorState =
            elevator.targetFloors.length === 1
              ? {
                  ...elevator,
                  status: "STOP",
                  targetFloors: getRemovedTargetFloors(
                    elevator.targetFloors,
                    targetFloor
                  ),
                }
              : {
                  ...elevator,
                  targetFloors: getRemovedTargetFloors(
                    elevator.targetFloors,
                    targetFloor
                  ) as [number, ...number[]],
                };

          updateElevatorState(newStates);
          return;
        }

        const direction = elevator.currentFloor < targetFloor ? "UP" : "DOWN";
        const nextFloor =
          direction === "UP"
            ? elevator.currentFloor + 1
            : elevator.currentFloor - 1;

        updateElevatorState({
          ...elevator,
          currentFloor: nextFloor,
        });
      },
      { delay: 1000, run: elevator.status === "RUN" }
    );

    return (
      <div>
        {elevator.direction === "UP"
          ? "⬆️"
          : elevator.direction === "DOWN"
          ? "⬇️"
          : "⏹️"}
        <div style={floorListStyle}>
          {floors.map((floor, index) => (
            <div
              key={index}
              style={
                elevator.currentFloor === floor
                  ? elevator.status === "RUN"
                    ? movingElevatorStyle
                    : elevatorStyle
                  : undefined
              }
            >
              {floor}
            </div>
          ))}
        </div>
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

const floorListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column-reverse",
  gap: "10px",
  padding: "10px",
  border: "1px solid black",
};
