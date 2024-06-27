import { Direction, ElevatorState } from "../_type/elevatorState";
import { useInterval } from "../../utils/hooks/useInterval";

export const useAllocateElevatorToTargetFloor = (
  elevator: ElevatorState,
  setElevator: React.Dispatch<React.SetStateAction<ElevatorState>>,
  clickedButtons: {
    floor: number;
    direction: Direction;
  }[]
) => {
  useInterval(
    () => {
      if (clickedButtons.length === 0) return;

      const targetFloor = clickedButtons[0].floor;
      const direction = targetFloor > elevator.currentFloor ? "UP" : "DOWN";

      setElevator((prev) => ({
        ...prev,
        targetFloor,
        direction,
        status: "RUN",
      }));

      clickedButtons.shift();
    },
    {
      delay: 1000,
      run: clickedButtons.length > 0,
    }
  );
};
