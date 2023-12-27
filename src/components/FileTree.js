import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const exampleFiles = {
  id: "root",
  children: [
    {
      filename: "first_entry",
      children: [
        {
          filename: "second entry",
          children: [
            {
              filename: "depth three",
              children: [
                {
                  filename: "depth four",
                  children: [
                    {
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
      filename: "another one",
    },
    {
      filename: "ANOTHA ONE",
      children: [{ id: uuidv4(), filename: "ANOTHA ONE" }],
    },
    {
      filename: "quatttro",
    },
  ],
};

const FileTree = ({ fileTreeHidden }) => {
  const enhancedFiles = (objArr) => {
    if (!objArr) return null;
    return objArr.map((oldFile) => {
      return {
        ...oldFile,
        id: uuidv4(),
        newFileBeingMade: false,
        children: oldFile.children ? enhancedFiles(oldFile.children) : null,
      };
    });
  };

  const [files, setFiles] = useState(enhancedFiles(exampleFiles.children));
  //const [files, setFiles] = useState(exampleFiles);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  // Used to position the context menu next to the cursor
  const [cursorPos, setCursorPos] = useState({ X: 0, Y: 0 });
  // Used by the context menu to know which file called it
  const [currFileId, setCurrFileId] = useState("root");
  const [newFileBeingMade, setNewFileBeingMade] = useState(false);

  const handleRootContext = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const scrollContainer = document.querySelector(".prof-page");
    const clientX = e.clientX + 5;
    const clientY = scrollContainer.scrollTop + e.clientY - 45;
    setCursorPos({ X: clientX, Y: clientY });
    setContextMenuOpen(true);
    setCurrFileId("root");
  };

  return (
    <div
      className={`f-tr ${fileTreeHidden ? "tree-hidden" : ""}`}
      onContextMenu={handleRootContext}
    >
      {files.children.map((entry) => {
        return (
          <Entry
            key={entry.id}
            fileid={entry.id}
            filename={entry.filename}
            setContextMenuOpen={setContextMenuOpen}
            setCursorPos={setCursorPos}
            setCurrFileId={setCurrFileId}
            children={entry.children}
            currFileId={currFileId}
          />
        );
      })}
      {
        <CustomContext
          contextMenuOpen={contextMenuOpen}
          setContextMenuOpen={setContextMenuOpen}
          currFileId={currFileId}
          setCurrFileId={setCurrFileId}
          X={cursorPos.X}
          Y={cursorPos.Y}
        />
      }
    </div>
  );
};

const Entry = ({
  fileid,
  filename,
  children,
  setContextMenuOpen,
  setCursorPos,
  setCurrFileId,
  currFileId,
}) => {
  const [expanded, setExpanded] = useState(false);
  // Used to highlight the entry when it's used to call the context menu
  const [highlighted, setHighlighted] = useState(false);
  const [newFileBeingMade, setNewFileBeingMade] = useState(false);

  const handleOpenContext = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const clientX = e.clientX + 5;
    const clientY =
      e.clientY + document.querySelector(".prof-page").scrollTop - 45;
    setCursorPos({ X: clientX, Y: clientY });

    setContextMenuOpen(true);
    setCurrFileId(fileid);
    setHighlighted(true);
  };

  const expandHandler = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    //console.log("useEffectreached");
    if (currFileId !== fileid) {
      setHighlighted(false);
    }
  }, [currFileId, fileid]);

  return (
    <div>
      <div
        className={`entry ${highlighted ? "highlight" : ""}`}
        onClick={expandHandler}
        onContextMenu={handleOpenContext}
      >
        {children ? (
          <div className="plus-minus">{expanded ? "-" : "+"}</div>
        ) : (
          //<div style={{ width: "0.7rem" }} />
          <></>
        )}
        {filename}
      </div>
      {newFileBeingMade ? (
        <input type="text" style={{ marginLeft: `${15}px` }} />
      ) : null}
      {children && expanded
        ? children.map((entry) => {
            return (
              <div style={{ paddingLeft: `${15}px` }}>
                <Entry
                  key={entry.id}
                  fileid={entry.id}
                  filename={entry.filename}
                  expanded={entry.expanded}
                  children={entry.children}
                  setContextMenuOpen={setContextMenuOpen}
                  setCursorPos={setCursorPos}
                  setCurrFileId={setCurrFileId}
                  currFileId={currFileId}
                />
              </div>
            );
          })
        : ""}
    </div>
  );
};

const CustomContext = ({
  contextMenuOpen,
  setContextMenuOpen,
  currFileId,
  setCurrFileId,
  X,
  Y,
}) => {
  // We want the context menu to close if something else gets clicked on
  const handleOutsideClick = (e) => {
    if (e.target !== document.querySelector(".custom-context")) {
      setContextMenuOpen(false);
      setCurrFileId("root"); // De-highlights the previously selected file
    }
  };
  // This listens for the click outside of context menu
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  });

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
      <div className="context-btn">Create new file</div>
      {currFileId !== "root" ? (
        <>
          <div className="context-btn">Rename file</div>
          <div className="context-btn">Delete file</div>
        </>
      ) : null}
    </div>
  );
};

export default FileTree;
