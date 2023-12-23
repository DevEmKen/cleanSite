import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const exampleFiles = {
  id: uuidv4(),
  children: [
    {
      id: uuidv4(),
      filename: "first_entry",
      children: [
        {
          id: uuidv4(),
          filename: "second entry",
          children: [
            {
              id: uuidv4(),
              filename: "depth three",
              children: [
                {
                  id: uuidv4(),
                  filename: "depth four",
                  children: [
                    {
                      id: uuidv4(),
                      filename: "depth five",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      filename: "another one",
    },
    {
      id: uuidv4(),
      filename: "ANOTHA ONE",
    },
    {
      id: uuidv4(),
      filename: "quatttro",
    },
  ],
};

const FileTree = ({ fileTreeHidden }) => {
  const [files, setFiles] = useState(exampleFiles);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ X: 0, Y: 0 });

  const updateFilename = ({ oldName, newName }) => {
    setFiles((prev) => {
      if (prev.filename === oldName) {
        return { ...prev, filename: newName };
      }
      const updatedChildNames = prev.children?.map((child) => {
        if (child.filename === oldName) {
          return { ...child, filename: newName };
        }
        return child;
      });
      return { ...prev, children: updatedChildNames };
    });
  };

  return (
    <div className={`f-tr ${fileTreeHidden ? "tree-hidden" : ""}`}>
      {files.children.map((entry) => {
        return (
          <Entry
            key={entry.id}
            filename={entry.filename}
            updateFilename={updateFilename}
            setContextMenuOpen={setContextMenuOpen}
            setCursorPos={setCursorPos}
            children={entry.children}
            depth={1}
          />
        );
      })}
      {
        <CustomContext
          contextMenuOpen={contextMenuOpen}
          setContextMenuOpen={setContextMenuOpen}
          X={cursorPos.X}
          Y={cursorPos.Y}
        />
      }
    </div>
  );
};

const Entry = ({
  filename,
  children,
  depth,
  updateFilename,
  setContextMenuOpen,
  setCursorPos,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleOpenContext = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("context HGANDLER CALLED");

    const scrollContainer = document.querySelector(".prof-page");
    const clientX = e.clientX + 5;
    const clientY = scrollContainer.scrollTop + e.clientY - 45;
    console.log(clientY);
    setCursorPos({ X: clientX, Y: clientY });
    setContextMenuOpen(true);
  };

  const expandHandler = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div
        className="entry"
        onClick={expandHandler}
        onContextMenu={handleOpenContext}
      >
        {children ? (
          <div className="plus-minus">{expanded ? "-" : "+"}</div>
        ) : (
          <div style={{ width: "0.7rem" }} />
        )}
        {filename}
      </div>
      {children && expanded
        ? children.map((entry) => {
            return (
              <div style={{ paddingLeft: `${15}px` }}>
                <Entry
                  key={entry.id}
                  filename={entry.filename}
                  expanded={entry.expanded}
                  children={entry.children}
                  setContextMenuOpen={setContextMenuOpen}
                  setCursorPos={setCursorPos}
                  updateFilename={updateFilename}
                  depth={depth + 1}
                />
              </div>
            );
          })
        : ""}
    </div>
  );
};

const CustomContext = ({ contextMenuOpen, setContextMenuOpen, X, Y }) => {
  // useEffect(() => {
  //   console.log("X: " + X + " Y: " + Y);
  // }, []);

  // useEffect(() => {
  //   console.log("X: " + X + " Y: " + Y);
  // }, [contextMenuOpen]);

  // We want the context menu to close if something else gets clicked on
  const handleOutsideClick = (e) => {
    if (e.target !== document.querySelector(".custom-context")) {
      setContextMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const contextStyle = {
    position: "absolute",
    top: Y + "px",
    left: X + "px",
  };

  return (
    <div
      className={`custom-context ${contextMenuOpen ? "" : "context-hide"}`}
      style={contextStyle}
    >
      <div className="context-btn">Rename file</div>
      <div className="context-btn">Delete file</div>
    </div>
  );
};

export default FileTree;
