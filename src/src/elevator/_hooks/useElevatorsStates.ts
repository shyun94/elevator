import { useState } from "react";
import { ElevatorState } from "../_type/elevatorState";
import { defaultElevators } from "../_policy/defaultElevators";

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

  return {
    elevators,
    updateElevatorState,
  };
};
