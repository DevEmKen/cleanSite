import React, { useEffect, useState } from "react";
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
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  return (
    <>
      <div className="root-dir">
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

    setContextMenuOpen(true);
    dispatch(highlightNode(file.id));
  };

  return (
    <>
      <div
        className={`file-slot ${file.isHighlighted ? "highlighted" : ""}`}
        onClick={handleExpand}
        onContextMenu={handleOpenContext}
      >
        {file.children ? (
          <div className="expand-button">{file.isExpanded ? "-" : "+"}</div>
        ) : (
          <div className="file-icon">.</div>
        )}
        {file.filename}
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
  const handleOutsideClick = (e) => {
    const contextMenu = document.querySelector(".context-select");
    if (!contextMenu.contains(e.target)) {
      console.log("off");
      setContextMenuOpen(false);
      dispatch(highlightNode(null));
    }
  };

  const contextStyle = {
    top: cursorPos.Y,
    left: cursorPos.X,
  };

  return (
    <>
      {contextMenuOpen ? (
        <div className="context-select" style={contextStyle}>
          <div
            className="context-select-item"
            onClick={() => {
              dispatch(createNode());
              setContextMenuOpen(false);
            }}
          >
            Create
          </div>
          <div
            className="context-select-item"
            onClick={() => {
              dispatch(deleteNode());
              setContextMenuOpen(false);
            }}
          >
            Delete
          </div>
          <div
            className="context-select-item"
            onClick={() => {
              dispatch(startRenamingNode());
              setContextMenuOpen(false);
            }}
          >
            Rename
          </div>
        </div>
      ) : null}{" "}
    </>
  );
};

export default FileTreeV2;
