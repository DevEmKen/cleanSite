import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import exampleFiles from "./ExampleFiles";

const enhanceFiles = (file, parentId) => {
  const currId = uuidv4();
  return {
    ...file,
    id: parentId !== "" ? currId : "root",
    isHighlighted: false,
    isRenaming: false,
    isExpanded: false,
    parentId: parentId,
    children: file.children
      ? file.children.map((child) => enhanceFiles(child, currId))
      : null,
  };
};

const traverseAndUpdateAll = (
  file,
  conditionFunc,
  matchFunc,
  noMatchFunc = () => {}
) => {
  // On every pass, clean up empty child arrays by setting to null
  // (Prevents erroneous +/- expand buttons from existing)
  if (file.children?.length === 0) {
    file.children = null;
  }
  // Then recursively execute the provided functions
  if (conditionFunc(file)) {
    matchFunc(file);
  } else {
    noMatchFunc(file);
  }
  file.children?.forEach((child) =>
    traverseAndUpdateAll(child, conditionFunc, matchFunc, noMatchFunc)
  );
};

export const FileTreeSlice = createSlice({
  name: "FileTreeSlice",
  initialState: enhanceFiles(exampleFiles, ""),
  reducers: {
    highlightNode(state, action) {
      const currId = action.payload;
      traverseAndUpdateAll(
        state,
        (file) => file.id === currId,
        (file) => (file.isHighlighted = true),
        (file) => (file.isHighlighted = false)
      );
    },
    // startRenamingNode and stopRenamingNode currently allow for multiple nodes to be renaming at once.
    // This is non-standard behavior compared to most file trees, but not necessarily a "bug".
    // If we want to prevent this, the context menu needs to keep track of the initial name of
    // the last file it started renaming for, in case an invalid whitespace name is submitted.
    startRenamingNode(state, action) {
      const currId = action.payload;
      traverseAndUpdateAll(
        state,
        (file) => file.highlighted === currId,
        (file) => (file.isRenaming = true)
      );
    },
    stopRenamingNode(state, action) {
      const { currId, newName } = action.payload;
      traverseAndUpdateAll(
        state,
        (file) => file.id === currId,
        (file) => {
          file.isRenaming = false;
          file.filename = newName;
        }
      );
    },
    deleteNode(state, action) {
      const { currId, parenId } = action.payload;
      traverseAndUpdateAll(
        state,
        (file) => file.id === parenId,
        (file) => {
          const removeInd = file.children.findIndex(
            (child) => child.id === currId
          );
          if (removeInd !== -1) {
            file.splice(removeInd, 1);
          }
        }
      );
    },
    createNode(state, action) {
      const currId = action.payload; // The node to create the child under
      const newNode = {
        filename: "New File", // Will only show if a whitespace name is submitted initally
        id: uuidv4(),
        isHighlighted: false,
        isRenaming: true,
        isExpanded: false,
        parentId: currId,
        children: null,
      };
      traverseAndUpdateAll(
        state,
        (file) => file.id === currId,
        (file) => {
          file.isExpanded = true;
          file.children.push(newNode);
        }
      );
    },
    toggleExpandCollapseNode(state, action) {
      const currId = action.payload;
      traverseAndUpdateAll(
        state,
        (file) => file.id === currId,
        (file) => (file.isExpanded = !file.isExpanded)
      );
    },
  },
});

export const {
  highlightNode,
  startRenamingNode,
  stopRenamingNode,
  deleteNode,
  createNode,
  toggleExpandCollapseNode,
} = FileTreeSlice.actions;

export default FileTreeSlice.reducer;
