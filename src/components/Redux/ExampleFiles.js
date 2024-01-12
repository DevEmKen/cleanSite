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
      filename: "example file in root",
    },
    {
      filename: "yet_another",
      children: [
        {
          filename: "fileThreeDepthTwo",
        },
      ],
    },
    {
      filename: "quatttro",
    },
  ],
};

export default exampleFiles;
