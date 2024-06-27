import { ElevatorState } from "../_type/elevatorState";

export const getMostClosedElevator = (
  elevators: ElevatorState[],
  floor: number
): ElevatorState => {
  return elevators.reduce((prev, current) => {
    const prevDiff = Math.abs(prev.currentFloor - floor);
    const currentDiff = Math.abs(current.currentFloor - floor);
    return prevDiff < currentDiff ? prev : current;
  });
};
