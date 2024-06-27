import { useState } from "react";
import { ElevatorState } from "../_type/elevatorState";
import { defaultElevators } from "../_policy/defaultElevators";
import { useInterval } from "../../utils/hooks/useInterval";
import { millisecondsPerFloor } from "../_policy/movingVelocity";

export const useElevatorsStates = () => {
  const [elevators, setElevators] = useState<ElevatorState[]>(defaultElevators);

  const updateElevatorState = (
    newElevatorState: ElevatorState,
    floor: number
  ) => {
    setElevators((prev) =>
      prev.map((prevElevator) => {
        if (prevElevator.id === newElevatorState.id) {
          return {
            ...prevElevator,
            targetFloor: floor,
            status: "RUN",
          };
        }
        return prevElevator;
      })
    );
  };

  useInterval(() => {
    setElevators((prev) =>
      prev.map((elevator) => {
        if (elevator.status === "RUN") {
          if (elevator.currentFloor < elevator.targetFloor!) {
            return { ...elevator, currentFloor: elevator.currentFloor + 1 };
          }
          if (elevator.currentFloor > elevator.targetFloor!) {
            return { ...elevator, currentFloor: elevator.currentFloor - 1 };
          }
          return { ...elevator, status: "STOP", targetFloor: undefined };
        }
        return elevator;
      })
    );
  }, millisecondsPerFloor);

  return {
    elevators,
    updateElevatorState,
  };
};
