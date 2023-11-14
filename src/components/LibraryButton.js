import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const LibraryButton = ({ libraryActive, setLibraryActive }) => {
  // Toggle whether the Library is active (popped-out)
  const libraryToggleHandler = () => {
    setLibraryActive(!libraryActive);
  };

  return (
    <div className={`library-button ${libraryActive ? "button-active" : ""}`}>
      <button onClick={libraryToggleHandler}>
        <FontAwesomeIcon icon={faMusic} style={{ padding: `2px` }} />
        <h3>Library</h3>
      </button>
    </div>
  );
};

export default LibraryButton;
