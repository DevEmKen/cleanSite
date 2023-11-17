import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const exampleFiles = {
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
    },
    {
      filename: "quatttro",
    },
  ],
};

const Entry = ({ filename, children, depth }) => {
  return (
    <div className={`entry ${children ? "dir" : "file"}`}>
      {filename}
      {children
        ? children.map((entry) => {
            return (
              <div style={{ paddingLeft: `${depth * 15}px` }}>
                <Entry
                  key={entry.filename}
                  filename={entry.filename}
                  children={entry.children}
                  depth={depth + 1}
                />
              </div>
            );
          })
        : ""}
    </div>
  );
};

const FileTree = ({ fileTreeHidden }) => {
  const [files, setFiles] = useState(exampleFiles);

  return (
    <div className={`file-tree ${fileTreeHidden ? "tree-hidden" : ""}`}>
      {files.children.map((entry) => {
        return (
          <Entry
            key={entry.filename}
            filename={entry.filename}
            children={entry.children}
            depth={1}
          />
        );
      })}
    </div>
  );
};

export default FileTree;
