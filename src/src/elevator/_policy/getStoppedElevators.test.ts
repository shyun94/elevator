import { describe, test, expect } from "vitest";
import { ElevatorState } from "../_type/elevatorState";
import { getStoppedElevators } from "./getStoppedElevators";

describe("getStoppedElevators", () => {
  test("should return all stopped elevators", () => {
    const elevators: ElevatorState[] = [
      {
        id: 1,
        status: "STOP",
        currentFloor: 1,
        targetFloors: [],
        direction: undefined,
      },
      {
        id: 2,
        status: "RUN",
        currentFloor: 1,
        targetFloors: [2],
        direction: "UP",
      },
      {
        id: 3,
        status: "STOP",
        currentFloor: 1,
        targetFloors: [],
        direction: undefined,
      },
    ];
    const stoppedElevators = getStoppedElevators(elevators);

    expect(stoppedElevators).toEqual([
      { id: 1, status: "STOP", currentFloor: 1, targetFloors: [] },
      { id: 3, status: "STOP", currentFloor: 1, targetFloors: [] },
    ]);
  });
});
