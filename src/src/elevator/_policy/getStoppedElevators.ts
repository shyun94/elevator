import { ElevatorState } from "../_type/elevatorState";

export const getStoppedElevators = (
  elevators: ElevatorState[]
): ElevatorState[] => {
  return elevators.filter((elevator) => elevator.status === "STOP");
};
