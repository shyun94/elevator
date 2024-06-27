import { useCallback, useState } from "react";
import {
  Direction,
  ElevatorState,
  getAddedTargetFloors,
} from "../_type/elevatorState";
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

  const setTargetFloorInFloor = (
    newElevatorState: ElevatorState,
    floor: number,
    direction: Direction
  ) => {
    const targetFloors = getAddedTargetFloors(
      newElevatorState.targetFloors,
      floor
    );

    updateElevatorState({
      ...newElevatorState,
      targetFloors,
      status: "RUN",
      direction,
    });
  };

  return {
    elevators,
    setTargetFloorInFloor,
    updateElevatorState,
  };
};
