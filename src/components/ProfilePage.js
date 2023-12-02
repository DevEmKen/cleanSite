import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import githubpng from "../assets/githubpng.png";
import googleplaypng from "../assets/googleplaypng.png";
// Child components
import ConnectFour from "./ConnectFour/ConnectFour";
import FileTree from "./FileTree";

// Assets
import connectpng from "../assets/connectpng.png";
import folderpng from "../assets/folderspng.png";
import wordscramblepng from "../assets/wordscramblepng.png";
import reddalyzer from "../assets/reddalyzer.png";

const ProfilePage = ({ currSong, musicMax, chatMax }) => {
  const songColor = {
    background: `linear-gradient(to top, #3978ff2b, #ffffff)`,
  };
  return (
    <div
      className={`prof-page ${musicMax ? "" : "music-min"} ${
        chatMax ? "" : "chat-min"
      }`}
      style={songColor}
    >
      <Projects chatMax={chatMax} />
    </div>
  );
};

const Projects = ({ chatMax }) => {
  const card1 = {
    title: "Connect Four",
    description:
      "An implementation of the game Connect Four, written in React.js. Computer opponent coming soon!",
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

  const [connectFourHidden, setConnectFourHidden] = useState(true);
  const [fileTreeHidden, setFileTreeHidden] = useState(true);

  const connectFourHandler = () => {
    console.log("connect four clicked");
    setConnectFourHidden(!connectFourHidden);
  };

  const fileTreeHandler = () => {
    setFileTreeHidden(!fileTreeHidden);
  };

  return (
    <div className="bottom-app">
      <div className="sidebar-spacer" />
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
            onClickHandler={connectFourHandler}
          />

          <ProjectCardLocal
            title={card2.title}
            description={card2.description}
            image={card2.image}
            onClickHandler={fileTreeHandler}
          />
        </div>
        <ConnectFour connectFourHidden={connectFourHidden} />
        <FileTree fileTreeHidden={fileTreeHidden} />
      </div>
      <div className={`chat-spacer ${chatMax ? "spacer-min" : ""}`} />
    </div>
  );
};

const ProjectCardExt = ({ title, description, image, google, github }) => {
  const gitHandler = () => {
    window.open(github, "_blank", "noreferrer");
    console.log("github");
  };
  const googleHandler = () => {
    window.open(google, "_blank", "noreferrer");
  };

  return (
    <div className="project-card ext">
      <h1>{title}</h1>
      <img src={image}></img>
      <h3>{description}</h3>
      <div className="proj-links">
        <div
          className="link-container"
          onClick={gitHandler}
          onAuxClick={gitHandler}
        >
          <img src={githubpng} /> <h4>Github</h4>
        </div>
        <div
          className="link-container"
          onClick={googleHandler}
          onAuxClick={googleHandler}
        >
          <img src={googleplaypng} /> <h4>Play Store</h4>
        </div>
      </div>
    </div>
  );
};

const ProjectCardLocal = ({ title, description, image, onClickHandler }) => {
  return (
    <div className="project-card local" onClick={onClickHandler}>
      <h1>{title}</h1>
      <img src={image}></img>
      <h3>{description}</h3>
      <FontAwesomeIcon
        icon={faAngleDown}
        style={{
          gridRowStart: "8",
          paddingTop: "10px",
          paddingRight: "40%",
          paddingBottom: "10px",
          paddingLeft: "40%",
        }}
      />
    </div>
  );
};

export default ProfilePage;
