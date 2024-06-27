import { describe, expect, test } from "vitest";
import { canNotSelectFloor } from "./canNotSelectFloor";
import { ElevatorState } from "../_type/elevatorState";

describe("canNotSelectFloor", () => {
  test("floor can not be selected when the stopped elevator is already on the floor", () => {
    const elevators: ElevatorState[] = [
      {
        id: 1,
        currentFloor: 1,
        targetFloor: undefined,
        status: "STOP",
        direction: "NONE",
      },
    ];
    const floor = 1;

    const result = canNotSelectFloor(elevators, floor);

    expect(result).toBe(true);
  });

  test("floor can not be selected when the elevator is already moving to the floor", () => {
    const elevators: ElevatorState[] = [
      {
        id: 1,
        currentFloor: 1,
        targetFloor: 2,
        status: "RUN",
        direction: "UP",
      },
    ];
    const floor = 2;

    const result = canNotSelectFloor(elevators, floor);

    expect(result).toBe(true);
  });
});
