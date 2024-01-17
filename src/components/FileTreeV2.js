import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  highlightNode,
  startRenamingNode,
  stopRenamingNode,
  deleteNode,
  createNode,
  toggleExpandCollapseNode,
} from "./Redux/FileTreeSlice";

const FileTreeV2 = () => {
  const files = useSelector((state) => state.FileTreeSlice);
  const dispatch = useDispatch();
  const [cursorPos, setCursorPos] = useState({ X: 0, Y: 0 });
  const [contextMenuOpen, setContextMenuOpen] = useState({
    isOpen: false,
    fromRoot: false,
  });

  const handleRootContext = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const clientX = e.clientX + 5;
    const clientY =
      e.clientY + document.querySelector(".prof-page").scrollTop - 45;
    setCursorPos({ X: clientX, Y: clientY });

    setContextMenuOpen({ isOpen: true, fromRoot: true });
    dispatch(highlightNode("root"));
  };

  return (
    <>
      <div className="root-dir" onContextMenu={handleRootContext}>
        {files?.children?.map((file) => {
          return (
            <Entry
              file={file}
              cursorPos={cursorPos}
              setCursorPos={setCursorPos}
              contextMenuOpen={contextMenuOpen}
              setContextMenuOpen={setContextMenuOpen}
            ></Entry>
          );
        })}
      </div>
      <ContextMenu
        cursorPos={cursorPos}
        setCursorPos={setCursorPos}
        contextMenuOpen={contextMenuOpen}
        setContextMenuOpen={setContextMenuOpen}
      />
    </>
  );
};

const Entry = ({
  file,
  cursorPos,
  setCursorPos,
  contextMenuOpen,
  setContextMenuOpen,
}) => {
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState("");

  const handleExpand = () => {
    dispatch(toggleExpandCollapseNode(file.id));
  };

  const handleOpenContext = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const clientX = e.clientX + 5;
    const clientY =
      e.clientY + document.querySelector(".prof-page").scrollTop - 45;
    setCursorPos({ X: clientX, Y: clientY });

    setContextMenuOpen({ isOpen: true, fromRoot: false });
    dispatch(highlightNode(file.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(stopRenamingNode({ currId: file.id, newName: inputVal }));
  };

  return (
    <>
      <div
        className={`file-slot ${file.isHighlighted ? "highlighted" : ""}`}
        onClick={handleExpand}
        onContextMenu={handleOpenContext}
      >
        {file.children ? (
          <FontAwesomeIcon
            icon={faAngleDown}
            className={
              "file-icon " + (file.isExpanded ? "angle-down" : "angle-right")
            }
          />
        ) : (
          <FontAwesomeIcon icon={faFile} className="file-icon pic" />
        )}
        {file.isRenaming ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              autoFocus
              defaultValue={file.filename}
              onSubmit={handleSubmit}
              onChange={(e) => setInputVal(e.target.value)}
            ></input>
          </form>
        ) : (
          file.filename
        )}
      </div>
      {file.children && file.isExpanded
        ? file.children.map((child) => {
            return (
              <div style={{ paddingLeft: "15px" }}>
                <Entry
                  file={child}
                  cursorPos={cursorPos}
                  setCursorPos={setCursorPos}
                  contextMenuOpen={contextMenuOpen}
                  setContextMenuOpen={setContextMenuOpen}
                ></Entry>
              </div>
            );
          })
        : null}
    </>
  );
};

const ContextMenu = ({ contextMenuOpen, setContextMenuOpen, cursorPos }) => {
  const dispatch = useDispatch();
  // This handler and the useEffect below it are used to close the context menu
  // when the user clicks outside of it
  const handleOutsideClick = (e) => {
    const contextMenu = document.querySelector(".context-select");
    if (contextMenu && !contextMenu.contains(e.target)) {
      setContextMenuOpen({ isOpen: false, fromRoot: false });
      dispatch(highlightNode(null));
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  });

  const contextStyle = {
    top: cursorPos.Y,
    left: cursorPos.X,
  };

  return (
    <>
      {contextMenuOpen.isOpen ? (
        <div className="context-select" style={contextStyle}>
          <div
            className="context-select-item"
            onClick={() => {
              dispatch(createNode());
              setContextMenuOpen({ isOpen: false, fromRoot: false });
            }}
          >
            <h3>Create file</h3>
          </div>
          {contextMenuOpen.fromRoot === false ? (
            <>
              <div
                className="context-select-item"
                onClick={() => {
                  dispatch(deleteNode());
                  setContextMenuOpen({ isOpen: false, fromRoot: false });
                }}
              >
                <h3>Delete file</h3>
              </div>
              <div
                className="context-select-item"
                onClick={() => {
                  dispatch(startRenamingNode());
                  setContextMenuOpen({ isOpen: false, fromRoot: false });
                }}
              >
                <h3>Rename file</h3>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default FileTreeV2;
