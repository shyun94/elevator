import { CSSProperties } from "react";
import "./App.css";
import { FloorButtons } from "./src/elevator/floor/components/FloorButtons";
import { ElevatorComponent } from "./src/elevator/_components/Elevator";
import { getMostClosedElevator } from "./src/elevator/_policy/getMostClosedElevator";
import { getStoppedElevators } from "./src/elevator/_policy/getStoppedElevators";
import { useElevatorsStates } from "./src/elevator/_hooks/useElevatorsStates";

function App() {
  const { elevators, updateElevatorState } = useElevatorsStates();

  const allElevatorIsRun = elevators.every(
    (elevator) => elevator.status === "RUN"
  );

  const selectFloor = (floor: number) => {
    const elevator = getMostClosedElevator(
      getStoppedElevators(elevators),
      floor
    );
    updateElevatorState(elevator, floor);
  };

  return (
    <>
      호출
      <FloorButtons disabled={allElevatorIsRun} selectFloor={selectFloor} />
      <div style={elevatorsWrapperStyle}>
        {elevators.map((elevator) => (
          <ElevatorComponent key={elevator.id} elevator={elevator} />
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
