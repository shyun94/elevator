export type ElevatorState = {
  id: number;
  currentFloor: number;
} & (MovingElevator | StoppedElevator);

export type Direction = "UP" | "DOWN";

type MovingElevator = {
  status: "RUN";
  direction: "UP" | "DOWN";
  targetFloor: number;
};

type StoppedElevator = {
  targetFloor: undefined;
  status: "STOP";
  direction: Direction | undefined; // stop elevator can have direction
};
