import redCir from "./red.svg";
import blackCir from "./black.svg";
import whiteCir from "./white.svg";

const Slot = ({ ch, x, y }) => {
  return (
    <>
      <div className="slot">
        <img src={ch === "" ? whiteCir : ch === "r" ? redCir : blackCir} />
      </div>
    </>
  );
};

export default Slot;
