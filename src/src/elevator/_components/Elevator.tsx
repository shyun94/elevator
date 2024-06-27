import { CSSProperties, memo } from "react";
import { Direction, ElevatorState } from "../_type/elevatorState";
import { floors } from "../floor/consts/floors";
import { useMoveElevatorInterval } from "../_hooks/useMoveElevatorInterval";

interface Props {
  elevator: ElevatorState;
  updateElevatorState: (newElevatorState: ElevatorState) => void;
}

export const ElevatorComponent = memo(
  ({ elevator, updateElevatorState }: Props) => {
    useMoveElevatorInterval(elevator, updateElevatorState);

    const selectFloor = (floor: number) => {
      // 방향과 다른 버튼을 누를때는 선택되지 않음
      if (elevator.direction === "UP" && floor < elevator.currentFloor) return;
      if (elevator.direction === "DOWN" && floor > elevator.currentFloor)
        return;

      const targetFloors: [number, ...number[]] =
        elevator.targetFloors.includes(floor)
          ? (elevator.targetFloors.filter(
              (targetFloor) => targetFloor !== floor
            ) as [number, ...number[]])
          : ([...elevator.targetFloors, floor] as [number, ...number[]]);

      const newStates: ElevatorState = {
        ...elevator,
        targetFloors,
        status: "RUN",
        direction:
          elevator.currentFloor <= floor
            ? "UP"
            : elevator.currentFloor > floor
            ? "DOWN"
            : (elevator.direction as Direction),
      };

      updateElevatorState(newStates);
    };

    return (
      <div>
        {elevator.direction === "UP"
          ? "⬆️"
          : elevator.direction === "DOWN"
          ? "⬇️"
          : "⏹️"}
        <div style={floorListStyle}>
          {floors.map((floor, index) => (
            <button
              key={index}
              style={
                elevator.currentFloor === floor
                  ? elevator.status === "RUN"
                    ? movingElevatorStyle
                    : elevatorStyle
                  : undefined
              }
              onClick={() => selectFloor(floor)}
            >
              {floor}
            </button>
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
