import { CSSProperties } from "react";
import "./App.css";
import { FloorButtons } from "./src/elevator/floor/components/FloorButtons";
import { ElevatorComponent } from "./src/elevator/_components/Elevator";
import { getMostClosedElevator } from "./src/elevator/_policy/getMostClosedElevator";
import { useElevatorsStates } from "./src/elevator/_hooks/useElevatorsStates";
import { Direction } from "./src/elevator/_type/elevatorState";
import { getElevatorsCanSelected } from "./src/elevator/_policy/getElevatorsCanSelected";

function App() {
  const { elevators, setTargetFloorInFloor, updateElevatorState } =
    useElevatorsStates();

  const clickFloorButton = (floor: number, direction: Direction) => {
    const elevator = getMostClosedElevator(
      getElevatorsCanSelected(elevators, floor, direction),
      floor
    );
    setTargetFloorInFloor(elevator, floor, direction);
  };

  const clickedButtons = elevators.flatMap((elevator) =>
    elevator.targetFloors.map((floor) => ({
      floor,
      direction: elevator.direction!,
    }))
  );

  return (
    <>
      <div style={elevatorsWrapperStyle}>
        <FloorButtons
          clickedButtons={clickedButtons}
          clickFloorButton={clickFloorButton}
        />
        {elevators.map((elevator) => (
          <ElevatorComponent
            key={`elevator-${elevator.id}`}
            elevator={elevator}
            updateElevatorState={updateElevatorState}
          />
        ))}
      </div>
    </>
  );
}

export default App;

const elevatorsWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};
