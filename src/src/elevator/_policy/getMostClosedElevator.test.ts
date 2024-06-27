import { expect, test, describe } from "vitest";
import { getMostClosedElevator } from "./getMostClosedElevator";
import { ElevatorState } from "../_type/elevatorState";

describe("getMostClosedElevator", () => {
  test("should return the most closed elevator", () => {
    const elevators: ElevatorState[] = [
      {
        id: 1,
        currentFloor: 1,
        targetFloor: undefined,
        status: "STOP",
        direction: "NONE",
      },
      {
        id: 2,
        currentFloor: 2,
        targetFloor: undefined,
        status: "STOP",
        direction: "NONE",
      },
      {
        id: 3,
        currentFloor: 3,
        targetFloor: undefined,
        status: "STOP",
        direction: "NONE",
      },
    ];
    const floor = 4;
    const result = getMostClosedElevator(elevators, floor);
    expect(result).toEqual({
      id: 3,
      currentFloor: 3,
      targetFloor: undefined,
      status: "STOP",
    });
  });
});
