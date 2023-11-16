import { useState } from "react";

import ConnectFour from "./ConnectFour/ConnectFour";
import FileTree from "./FileTree";
import ProjectCardLocal from "./ProjectCardLocal";
import ProjectCardExt from "./ProjectCardExt";
import connectpng from "../assets/connectpng.png";
import folderpng from "../assets/folderspng.png";
import wordscramblepng from "../assets/wordscramblepng.png";
import reddalyzer from "../assets/reddalyzer.png";

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
  const card3 = {
    title: "WordScramble",
    description:
      "Boggle-like app (Java, Android Studio) that recursively solves the board, utilizing multithreading to improve user experience and reduce stuttering.",
    image: wordscramblepng,
    github: "https://github.com/DevEmKen/WordScramble",
    google:
      "https://play.google.com/store/apps/details?id=com.em.wscramble&pli=1",
  };
  const card4 = {
    title: "Reddalyzer",
    description:
      "Chrome extension that lists any Reddit threads for the current URL, if they exist. Written in Javascript, HTML, and CSS, it uses JQuery to call the Reddit API and search for relevant threads. ",
    image: reddalyzer,
    github: "https://github.com/DevEmKen/Reddalyzer",
    google:
      "https://chromewebstore.google.com/detail/reddalyzer/mkipifdfhcekkofifhbppmpkipohmaka?hl=en-US&pli=1",
  };

  return (
    <div className="projects">
      <div className="cards">
        <ProjectCardExt
          title={card3.title}
          description={card3.description}
          image={card3.image}
          google={card3.google}
          github={card3.github}
        />
        <ProjectCardExt
          title={card4.title}
          description={card4.description}
          image={card4.image}
          google={card4.google}
          github={card4.github}
        />
      </div>
      <div className="cards">
        <ProjectCardLocal
          title={card1.title}
          description={card1.description}
          image={card1.image}
        />
        <ProjectCardLocal
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
