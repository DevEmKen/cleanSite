import { useState } from "react";

import ConnectFour from "./ConnectFour/ConnectFour";
import FileTree from "./FileTree";
import ProjectCard from "./ProjectCard";
import connectpng from "../assets/connectpng.png";
import folderpng from "../assets/folderspng.png";

const Projects = ({ currSong }) => {
  const card1 = {
    title: "Connect Four",
    description:
      "An implementation of the game Connect Four. Computer opponent coming soon!",
    image: connectpng,
  };
  const card2 = {
    title: "Folder Tree",
    description:
      "A visual implementation of the typical tree structure used for file directories. Supports dynamic creation and deletion of files and directories.",
    image: folderpng,
  };

  return (
    <div className="projects">
      <div className="cards">
        <ProjectCard
          title={card1.title}
          description={card1.description}
          image={card1.image}
        />
        <ProjectCard
          title={card2.title}
          description={card2.description}
          image={card2.image}
        />
      </div>
      <FileTree />
      <ConnectFour currSong={currSong} />
    </div>
  );
};

export default Projects;
