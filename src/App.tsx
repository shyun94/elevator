import { CSSProperties, useState } from "react";
import "./App.css";
import { FloorButtons } from "./src/elevator/floor/components/FloorButtons";
import { ElevatorComponent } from "./src/elevator/_components/Elevator";
import { Direction } from "./src/elevator/_type/elevatorState";

function App() {
  const [clickedButtons, setClickedButtons] = useState<
    {
      floor: number;
      direction: Direction;
    }[]
  >([]);

  const clickFloorButton = (floor: number, direction: Direction) => {
    setClickedButtons((prev) => [
      ...prev,
      {
        floor,
        direction,
      },
    ]);
  };

  return (
    <>
      <div style={elevatorsWrapperStyle}>
        <FloorButtons
          clickedButtons={clickedButtons}
          clickFloorButton={clickFloorButton}
        />
        {[1, 2, 3].map((id) => (
          <ElevatorComponent
            key={id}
            clickedButtons={clickedButtons}
            setClickedButtons={() => void 0}
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
