import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const FileTreeV2 = () => {
  const files = useSelector((state) => state.fileTreeReds);
  const dispatch = useDispatch();
  return (
    <div className="root-dir">
      {files?.children?.map((file) => {
        return <Entry file={file}></Entry>;
      })}
    </div>
  );
};

const Entry = ({ file }) => {
  return <div className="entry">WUZ GOOD</div>;
};

export default FileTreeV2;
