import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";

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

const FileTreeV2 = () => {
  return <></>;
};

export default FileTreeV2;
