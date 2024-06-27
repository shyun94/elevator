export type ElevatorState = {
  currentFloor: number;
} & (MovingElevator | StoppedElevator);

export type Direction = "UP" | "DOWN";

type MovingElevator = {
  status: "RUN";
  direction: "UP" | "DOWN";
  targetFloor: number;
};

type StoppedElevator = {
  status: "STOP";
  direction: Direction | undefined; // stop elevator can have direction
  targetFloor: number | undefined;
};
