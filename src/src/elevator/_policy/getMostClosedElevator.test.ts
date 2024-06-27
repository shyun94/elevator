import { expect, test, describe } from "vitest";
import { getMostClosedElevator } from "./getMostClosedElevator";
import { ElevatorState } from "../_type/elevatorState";

describe("getMostClosedElevator", () => {
  test("should return the most closed elevator", () => {
    const elevators: ElevatorState[] = [
      {
        id: 1,
        currentFloor: 1,
        targetFloor: [],
        status: "STOP",
        direction: undefined,
      },
      {
        id: 2,
        currentFloor: 2,
        targetFloor: [],
        status: "STOP",
        direction: undefined,
      },
      {
        id: 3,
        currentFloor: 3,
        targetFloor: [],
        status: "STOP",
        direction: undefined,
      },
    ];
    const floor = 4;
    const result = getMostClosedElevator(elevators, floor);
    expect(result).toEqual({
      id: 3,
      currentFloor: 3,
      targetFloors: [],
      status: "STOP",
    });
  });
});
