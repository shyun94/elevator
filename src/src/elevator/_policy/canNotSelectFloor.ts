import { ElevatorState } from "../_type/elevatorState";

export const canNotSelectFloor = (
  elevators: ElevatorState[],
  floor: number
): boolean => {
  return elevators.some(
    (elevator) =>
      elevator.targetFloor === floor ||
      (elevator.currentFloor === floor && elevator.status === "STOP")
  );
};
