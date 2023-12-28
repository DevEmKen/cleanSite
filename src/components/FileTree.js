import React, { useEffect, useState } from "react";
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
      children: [
        {
          filename: "ANOTHA ONE",
        },
      ],
    },
    {
      filename: "quatttro",
    },
  ],
};

const FileTree = ({ fileTreeHidden }) => {
  const enhanceFiles = (files, parentId) => {
    const newId = uuidv4();
    return {
      ...files,
      renaming: false,
      expanded: false,
      id: newId,
      parentId: parentId,
      children: files.children?.map((child) => enhanceFiles(child, newId)),
    };
  };

  const [files, setFiles] = useState(enhanceFiles(exampleFiles));
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  // Used to position the context menu next to the cursor
  const [cursorPos, setCursorPos] = useState({ X: 0, Y: 0 });
  // Used by the context menu to know which file called it
  const [currFileId, setCurrFileId] = useState("root");
  const [inputVal, setInputVal] = useState("");

  // Stops root directory from having "Rename" or "Delete" option
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

  const handleRenameFromContext = () => {
    setFiles((prevFiles) => {
      const newFiles = renameHelper(prevFiles, currFileId);
      return newFiles;
    });

    const renameHelper = (tree, targetId) => {
      if (!tree) return;
      console.log("looking for " + targetId + " found " + tree.id);
      if (tree.id === targetId) {
        setContextMenuOpen(false);
        return {
          ...tree,
          renaming: true,
        };
      } else {
        return {
          ...tree,
          renaming: false,
          children: tree.children?.map((ch) => renameHelper(ch, targetId)),
        };
      }
    };
  };

  const handleRenameFromEntry = (inputVal) => {
    setFiles((prevFiles) => {
      const newFiles = renameHelper(prevFiles, currFileId);
      return newFiles;
    });

    const renameHelper = (tree, targetId) => {
      if (!tree) return;
      if (tree.id === targetId) {
        return {
          ...tree,
          filename: inputVal,
          renaming: false,
        };
      } else {
        return {
          ...tree,
          children: tree.children?.map((ch) => renameHelper(ch, targetId)),
        };
      }
    };
  };

  const handleRenameFromRoot = (e) => {
    const v = e.target.value;
    handleRenameFromEntry(v);
  };

  const handleCreateFile = () => {
    setFiles((prevFiles) => {
      const newFiles = createHelper(prevFiles, currFileId);
      return newFiles;
    });

    const createHelper = (tree, targetId) => {
      if (!tree) return;
      if (tree.id === targetId) {
        const newFile = {
          filename: "",
          renaming: true,
          id: uuidv4(),
          expanded: false,
        };
        setCurrFileId(newFile.id);
        tree.expanded = true;
        return {
          ...tree,
          children: tree.children ? [newFile, ...tree.children] : [newFile],
        };
      } else {
        return {
          ...tree,
          children: tree.children?.map((ch) => createHelper(ch, targetId)),
        };
      }
    };
  };

  const handleDeleteFile = () => {
    setFiles((prevFiles) => {
      const newFiles = deleteHelper(prevFiles, currFileId);
      return newFiles;
    });

    const deleteHelper = (tree, targetId) => {
      if (!tree) return;
      if (tree?.id === targetId) {
        deleteFromParent(files, tree.parentId, targetId);
      } else {
        return {
          ...tree,
          children: tree?.children?.map((ch) => deleteHelper(ch, targetId)),
        };
      }
    };

    const deleteFromParent = (tree, parentId, targetId) => {
      if (tree.id === parentId) {
        return {
          ...tree,
          expanded: false,
          children: tree.children?.filter((ch) => ch?.id !== targetId),
        };
      }
    };
  };

  return (
    <div
      className={`f-tr ${fileTreeHidden ? "tree-hidden" : ""}`}
      onContextMenu={handleRootContext}
    >
      {files.renaming ? (
        <form onSubmit={handleRenameFromRoot}>
          <input
            type="text"
            style={{
              marginLeft: `${1}px`,
            }}
            defaultValue={""}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </form>
      ) : null}
      {files.children.map((entry) => {
        if (!entry) return null;
        return (
          <Entry
            key={entry.id}
            fileObj={entry}
            fileid={entry.id}
            filename={entry.filename}
            handleRename={handleRenameFromEntry}
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
          files={files}
          setFiles={setFiles}
          handleRename={handleRenameFromContext}
          handleCreateFile={handleCreateFile}
          handleDeleteFile={handleDeleteFile}
          X={cursorPos.X}
          Y={cursorPos.Y}
        />
      }
    </div>
  );
};

const Entry = ({
  fileObj,
  fileid,
  filename,
  handleRename,
  children,
  setContextMenuOpen,
  setCursorPos,
  setCurrFileId,
  currFileId,
}) => {
  const [expanded, setExpanded] = useState(false);
  // Used to highlight the entry when it's used to call the context menu
  const [highlighted, setHighlighted] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const inputRef = React.useRef(null);

  // Runs whenever renaming starts or stops
  useEffect(() => {
    if (isRenaming) {
      setHighlighted(false);
      inputRef.current.focus();
    }
  }, [isRenaming]);

  useEffect(() => {
    setIsRenaming(fileObj.renaming);
    if (isRenaming) {
      setHighlighted(false);
      inputRef.current.focus();
    }
  }, [fileObj.renaming]);

  useEffect(() => {
    setExpanded(fileObj.expanded);
  }, [fileObj.expanded]);

  // Stops from attempting to render a null Entry if all
  // children of a component are deleted
  useEffect(() => {
    if (!fileObj.children) {
      setExpanded(false);
    }
  }, [fileObj.children]);

  useEffect(() => {
    //console.log("useEffectreached");
    if (currFileId !== fileid) {
      if (isRenaming) {
      }
      setHighlighted(false);
      setIsRenaming(false);
    }
  }, [currFileId, fileid]);

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

  const handleRenameLocal = (e) => {
    e.preventDefault();
    setCurrFileId(fileid);
    if (inputVal.trim() !== "") {
      handleRename(inputVal);
    }
    setIsRenaming(false);
    setHighlighted(false);
  };

  const expandHandler = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div
        className={`entry ${highlighted ? "highlight" : ""}`}
        onClick={expandHandler}
        onContextMenu={handleOpenContext}
      >
        {children ? (
          <div className="plus-minus">{expanded ? "-" : "+"}</div>
        ) : //<div style={{ width: "0.7rem" }} />
        null}
        {isRenaming ? (
          <form onSubmit={handleRenameLocal}>
            <input
              type="text"
              ref={inputRef}
              style={{
                marginLeft: `${1}px`,
              }}
              defaultValue={filename}
              onChange={(e) => setInputVal(e.target.value)}
            />
          </form>
        ) : (
          filename
        )}
      </div>

      {children && expanded
        ? children.map((entry) => {
            if (!entry) return null;
            return (
              <div style={{ paddingLeft: `${15}px` }}>
                <Entry
                  key={entry.id}
                  fileObj={entry}
                  fileid={entry.id}
                  filename={entry.filename}
                  handleRename={handleRename}
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
  files,
  setFiles,
  handleRename,
  handleCreateFile,
  handleDeleteFile,
  X,
  Y,
}) => {
  // We want the context menu to close if something else gets clicked on
  // const handleOutsideClick = (e) => {
  //   if (e.target !== document.querySelector(".context-btn")) {
  //     console.log("off");
  //     setContextMenuOpen(false);
  //     setCurrFileId("root"); // De-highlights the previously selected file
  //   }
  // };
  // // This listens for the click outside of context menu
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleOutsideClick);
  //   return () => document.removeEventListener("mousedown", handleOutsideClick);
  // });
  const handleCreateFileLocal = () => {
    handleCreateFile();
    setContextMenuOpen(false);
  };

  const handleDeleteFileLocal = () => {
    handleDeleteFile();
    setContextMenuOpen(false);
  };

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
      <div className="context-btn" onClick={handleCreateFileLocal}>
        Create new file
      </div>
      {currFileId !== "root" ? (
        <>
          <div
            className="context-btn"
            onClick={handleRename}
            style={{ cursor: "pointer" }}
          >
            Rename file
          </div>
          <div className="context-btn" onClick={handleDeleteFileLocal}>
            Delete file
          </div>
        </>
      ) : null}
    </div>
  );
};

export default React.memo(FileTree);
