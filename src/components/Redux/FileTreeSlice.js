import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import exampleFiles from "./ExampleFiles";

const enhanceFiles = (file, parentId) => {
  const id = parentId === "init" ? "root" : uuidv4();
  return {
    ...file,
    id: id,
    isHighlighted: false,
    isRenaming: false,
    isExpanded: false,
    parentId: parentId,
    children: file.children
      ? file.children.map((child) => enhanceFiles(child, id))
      : null,
  };
};

const traverseAndUpdateAll = (
  file,
  conditionFunc,
  matchFunc,
  noMatchFunc = () => {}
) => {
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
  initialState: enhanceFiles(exampleFiles, "init"),
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
    startRenamingNode(state) {
      traverseAndUpdateAll(
        state,
        (file) => file.isHighlighted === true,
        (file) => {
          file.isRenaming = true;
          file.isHighlighted = false;
        }
      );
    },
    stopRenamingNode(state, action) {
      const { currId, newName } = action.payload;
      traverseAndUpdateAll(
        state,
        (file) => file.id === currId,
        (file) => {
          file.isRenaming = false;
          file.isHighlighted = false;
          if (newName.trim() !== "") {
            file.filename = newName;
          }
        }
      );
    },
    deleteNode(state) {
      const root = state;
      // This code structure suggests O(n^2), but since "file.isHighlighted === true" only
      // matches once, the traverseAndUpdateAll calls are effectively sequential and
      // therefore O(2n).
      traverseAndUpdateAll(
        state,
        (file) => file.isHighlighted === true,
        (file) => {
          const childId = file.id;
          const parentId = file.parentId;
          traverseAndUpdateAll(
            root,
            (f) => f.id === parentId,
            (f) => {
              const index = f.children.findIndex(
                (child) => child.id === childId
              );
              if (index !== -1) {
                f.children.splice(index, 1);
              }
            }
          );
        }
      );
      // Delete empty child arrays to prevent
      // unnecessary expansion arrows from showing
      traverseAndUpdateAll(
        state,
        () => true,
        (file) => {
          if (file.children?.length === 0) {
            file.children = null;
          }
        }
      );
    },
    createNode(state) {
      const newNode = {
        filename: "New File",
        id: uuidv4(),
        isHighlighted: false,
        isRenaming: true,
        isExpanded: false,
        children: null,
      };
      traverseAndUpdateAll(
        state,
        (file) => file.isHighlighted === true,
        (file) => {
          file.isExpanded = true;
          file.isHighlighted = false;
          if (!file.children) {
            file.children = [];
          }
          file.children.push({ ...newNode, parentId: file.id });
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
