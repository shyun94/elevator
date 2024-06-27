import { useInterval } from "../../utils/hooks/useInterval";
import { ElevatorState, getRemovedTargetFloors } from "../_type/elevatorState";

export const useMoveElevatorInterval = (
  elevator: ElevatorState,
  updateElevatorState: (newElevatorState: ElevatorState) => void
) => {
  useInterval(
    () => {
      if (elevator.targetFloors.length === 0) {
        updateElevatorState({
          ...elevator,
          status: "STOP",
          direction: undefined,
        });
        return;
      }

      const targetFloor = elevator.targetFloors[0];
      if (elevator.currentFloor === targetFloor) {
        const newStates: ElevatorState =
          elevator.targetFloors.length === 1
            ? {
                ...elevator,
                status: "STOP",
                direction: undefined,
                targetFloors: getRemovedTargetFloors(
                  elevator.targetFloors,
                  targetFloor
                ),
              }
            : {
                ...elevator,
                targetFloors: getRemovedTargetFloors(
                  elevator.targetFloors,
                  targetFloor
                ) as [number, ...number[]],
              };

        updateElevatorState(newStates);
        return;
      }

      const direction = elevator.currentFloor < targetFloor ? "UP" : "DOWN";
      const nextFloor =
        direction === "UP"
          ? elevator.currentFloor + 1
          : elevator.currentFloor - 1;

      updateElevatorState({
        ...elevator,
        currentFloor: nextFloor,
      });
    },
    { delay: 1000, run: elevator.status === "RUN" }
  );
};
