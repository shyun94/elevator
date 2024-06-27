import { useCallback, useState } from "react";
import { ElevatorState } from "../_type/elevatorState";
import { defaultElevators } from "../_policy/defaultElevators";

export const useElevatorsStates = () => {
  const [elevators, setElevators] = useState<ElevatorState[]>(defaultElevators);

  const updateElevatorState = useCallback((newElevatorState: ElevatorState) => {
    setElevators((prev) =>
      prev.map((prevElevator) => {
        if (prevElevator.id === newElevatorState.id) {
          return newElevatorState;
        }
        return prevElevator;
      })
    );
  }, []);

  const setTargetFloor = (newElevatorState: ElevatorState, floor: number) => {
    updateElevatorState({
      ...newElevatorState,
      targetFloor: floor,
      status: "RUN",
      direction: newElevatorState.currentFloor < floor ? "UP" : "DOWN",
    });
  };

  return {
    elevators,
    setTargetFloor,
    updateElevatorState,
  };
};
