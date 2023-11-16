import redCir from "../assets/red.svg";
import blackCir from "../assets/black.svg";
import whiteCir from "../assets/white.svg";

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
