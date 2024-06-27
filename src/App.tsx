import { CSSProperties, useState } from "react";
import "./App.css";
import { FloorButtons } from "./src/elevator/floor/components/FloorButtons";
import { ElevatorState } from "./src/elevator/_type/elevatorState";
import { ElevatorComponent } from "./src/elevator/_components/Elevator";
import { defaultElevators } from "./src/elevator/_policy/defaultElevators";

function App() {
  const [elevators] = useState<ElevatorState[]>(defaultElevators);
  return (
    <>
      호출
      <FloorButtons />
      <div style={elevatorsWrapperStyle}>
        {elevators.map((elevator, index) => (
          <ElevatorComponent
            key={index}
            // elevator={elevator}
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
