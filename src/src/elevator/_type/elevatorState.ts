export type ElevatorState = {
  id: number;
  currentFloor: number;
  targetFloor: number | undefined;
  status: Status;
};

type Status = "RUN" | "STOP";
