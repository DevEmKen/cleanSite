import { createSlice } from "@reduxjs/toolkit";

export const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState: enhanceFiles(exampleFiles, ""),
  reducers: {
    highlightNode(state, action) {
      const currId = action.payload;
      const highlightNodeRecursive = (file) => {
        if (file.id === currId) {
          file.isHighlighted = true;
        } else {
          file.isHighlighted = false;
        }
        file.children?.forEach((child) => highlightNodeRecursive(child));
      };

      highlightNodeRecursive(state);
    },
    renameNode(state, action) {
      currId = action.payload;
      const renameNodeRecursive = (file) => {
        if (file.id === currId) {
          file.isRenaming = true;
        } else {
          file.isRenaming = false;
        }
        file.children?.forEach((child) => renameNodeRecursive(child));
      };
      renameNodeRecursive(state);
    },
  },
});

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

const exampleFiles = {
  filename: "root",
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

export const { highlightNode, renameNode } = counterSlice.actions;

export default counterSlice.reducer;
