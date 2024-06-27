import { Dispatch, SetStateAction } from "react";
import { useInterval } from "../../utils/hooks/useInterval";
import { Direction, ElevatorState } from "../_type/elevatorState";

export const useMoveToTargetFloorInterval = (
  elevator: ElevatorState,
  setElevator: Dispatch<SetStateAction<ElevatorState>>,
  setClickedButtons: Dispatch<
    SetStateAction<
      {
        floor: number;
        direction: Direction;
      }[]
    >
  >
) => {
  useInterval(
    () => {
      const currentFloor =
        elevator.direction === "UP"
          ? elevator.currentFloor + 1
          : elevator.currentFloor - 1;

      if (elevator.status === "RUN") {
        setElevator((prev) => ({
          ...prev,
          currentFloor,
        }));
      }

      if (currentFloor === elevator.targetFloor) {
        setElevator((prev) => ({
          ...prev,
          status: "STOP",
          direction: undefined,
        }));

        setClickedButtons((prev) => {
          return prev.filter((button) => button.floor !== currentFloor);
        });
      }
    },
    { delay: 1000, run: elevator.status === "RUN" }
  );
};
