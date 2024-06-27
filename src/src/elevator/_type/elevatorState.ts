export type ElevatorState = {
  id: number;
  currentFloor: number;
} & (MovingElevator | StoppedElevator);

export type Direction = "UP" | "DOWN";

type MovingElevator = {
  status: "RUN";
  direction: "UP" | "DOWN";
  targetFloors: [number, ...number[]];
};

type StoppedElevator = {
  status: "STOP";
  direction: Direction | undefined; // stop elevator can have direction
  targetFloors: number[];
};

export const getAddedTargetFloors = (
  targetFloors: number[],
  floor: number
): [number, ...number[]] => {
  return [...targetFloors, floor].sort((a, b) => a - b) as [
    number,
    ...number[]
  ];
};

export const getRemovedTargetFloors = (
  targetFloors: number[],
  floor: number
): number[] => {
  return targetFloors.filter((targetFloor) => targetFloor !== floor);
};

export const isEmptyTargetFloors = (targetFloors: number[]) =>
  targetFloors.length === 0;
