import { Direction, ElevatorState } from "../_type/elevatorState";

export const getElevatorsCanSelected = (
  elevators: ElevatorState[],
  floor: number,
  direction: Direction
): ElevatorState[] => {
  return elevators.filter((elevator) => {
    if (elevator.status === "STOP") return true;
    if (elevator.direction === direction && elevator.currentFloor <= floor)
      return true;

    return false;
  });
};
