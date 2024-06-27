import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Direction } from "../_type/elevatorState";
import { floors } from "../floor/consts/floors";
import { useMoveToTargetFloorInterval } from "../_hooks/useMoveToTargetFloorInterval";
import { defaultElevator } from "../_policy/defaultElevator";
import { useAllocateElevatorToTargetFloor } from "../_hooks/useAllocateElevatorToTargetFloor";

interface Props {
  clickedButtons: {
    floor: number;
    direction: Direction;
  }[];
  setClickedButtons: Dispatch<
    SetStateAction<
      {
        floor: number;
        direction: Direction;
      }[]
    >
  >;
}

export const ElevatorComponent = ({
  clickedButtons,
  setClickedButtons,
}: Props) => {
  const [elevator, setElevator] = useState(defaultElevator);
  const [selectedFloors, setSelectedFloors] = useState<number[]>([]);

  useMoveToTargetFloorInterval(elevator, setElevator, setClickedButtons);
  useAllocateElevatorToTargetFloor(elevator, setElevator, clickedButtons);

  const selectFloor = (floor: number) => {
    // 방향과 다른 버튼을 누를때는 선택되지 않음
    if (elevator.direction === "UP" && floor < elevator.currentFloor) return;
    if (elevator.direction === "DOWN" && floor > elevator.currentFloor) return;

    setSelectedFloors((prev) => [...prev, floor]);
  };

  useEffect(() => {
    if (elevator.status === "STOP" && selectedFloors.length) {
      const targetFloor = selectedFloors[0];
      const direction = targetFloor > elevator.currentFloor ? "UP" : "DOWN";

      setElevator((prev) => ({
        ...prev,
        targetFloor,
        direction,
        status: "RUN",
      }));

      setSelectedFloors((prev) => prev.slice(1));
    }
  }, [elevator.currentFloor, elevator.status, selectedFloors]);

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
            disabled={
              selectedFloors.includes(floor) || elevator.targetFloor === floor
            }
            onClick={() => selectFloor(floor)}
          >
            {floor}
          </button>
        ))}
      </div>
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

const floorListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column-reverse",
  gap: "10px",
  padding: "10px",
  border: "1px solid black",
};
