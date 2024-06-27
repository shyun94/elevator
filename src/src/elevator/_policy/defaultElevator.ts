import { ElevatorState } from "../_type/elevatorState";

export const defaultElevator: ElevatorState = {
  currentFloor: 1,
  status: "STOP",
  direction: undefined,
  targetFloor: undefined,
};
