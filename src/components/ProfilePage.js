import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faCircleXmark,
  faMitten,
  faHand,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import githubpng from "../assets/githubpng.png";
import googleplaypng from "../assets/googleplaypng.png";
// Child components
import ConnectFour from "./ConnectFour/ConnectFour";
import FileTree from "./FileTree";
import FileTreeV2 from "./FileTreeV2";
import UserTable from "./UserTable.tsx";

// Assets
import connectpng from "../assets/connectpng.png";
import folderpng from "../assets/folderspng.png";
import wordscramblepng from "../assets/wordscramblepng.png";
import reddalyzer from "../assets/reddalyzer.png";
import profpic from "../assets/profpic.jpg";
import tablepng from "../assets/tablepng.png";

const ProfilePage = ({
  currSong,
  musicMax,
  chatMax,
  aboutMeVisible,
  setAboutMeVisible,
}) => {
  const songColor = {
    background: `linear-gradient(to top, #3978ff1f, #f0f5ff1f)`,
  };
  return (
    <div
      className={`prof-page ${musicMax ? "" : "music-min"} ${
        chatMax ? "" : "chat-min"
      }`}
      style={songColor}
    >
      <Projects
        chatMax={chatMax}
        musicMax={musicMax}
        aboutMeVisible={aboutMeVisible}
        setAboutMeVisible={setAboutMeVisible}
      />
    </div>
  );
};

const Projects = ({ chatMax, musicMax, aboutMeVisible, setAboutMeVisible }) => {
  const card1 = {
    title: "Connect Four",
    description:
      "An implementation of the game Connect Four, written in React.js. Computer opponent coming soon!",
    image: connectpng,
  };
  const card2 = {
    title: "Folder Tree V1",
    description:
      "A visual implementation of the typical tree structure used for file directories. Supports dynamic creation and deletion of files and directories. This buggy implementation uses callback functions to manage state instead of reducers.",
    image: folderpng,
  };
  const card3 = {
    title: "WordScramble",
    description:
      "Boggle-like app (Java, Android Studio) that recursively solves the board, utilizing multithreading to improve user experience and reduce stuttering.",
    image: wordscramblepng,
    github: "https://github.com/DevEmKen/Wordscramble-source",
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
  const card5 = {
    title: "Folder Tree V2",
    description:
      "A file tree structure that implements Redux to manage state instead of callback functions. Due to the recursive yet interconnected nature of the components within a file tree, this is a far cleaner, less buggy implementation than V1.",
    image: folderpng,
  };
  const card6 = {
    title: "User Table",
    description:
      "A table structure that downloads data from the randomuser.me API and displays it. Allows for sorting by property. Implements Redux and Typescript. Doesn't use an external table library like Table or React-Table.",
    image: tablepng,
  };

  const [connectFourHidden, setConnectFourHidden] = useState(true);
  const [fileTreeHidden, setFileTreeHidden] = useState(true);
  const [fileTreeV2Hidden, setFileTreeV2Hidden] = useState(true);
  const [userTableHidden, setUserTableHidden] = useState(true);
  const [headerClicked, setHeaderClicked] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerShrinking, setHeaderShrinking] = useState(false);

  const connectFourHandler = () => {
    setFileTreeHidden(true);
    setConnectFourHidden(!connectFourHidden);
  };

  const fileTreeHandler = () => {
    setConnectFourHidden(true);
    setFileTreeHidden(!fileTreeHidden);
  };

  const fileTreeV2Handler = () => {
    setFileTreeV2Hidden(!fileTreeV2Hidden);
  };

  const userTableHandler = () => {
    setUserTableHidden(!userTableHidden);
  };

  const headerClickHandler = () => {
    setHeaderClicked(true);
  };

  return (
    <div className="bottom-app">
      <div className="sidebar-spacer" />

      <div className="projects">
        {
          // This conditional render doesn't allow other elements to animate to
          // their new positions when intro-header is de-rendered. Possible fix
          // would be the package react-transition-group
          headerVisible && (
            <div
              className={`intro-header ${
                headerClicked ? "header-hidden" : ""
              } `}
              onClick={headerClickHandler}
            >
              <div className="intro-top-row">
                <h1>Hello there!</h1>
                <FontAwesomeIcon icon={faHand} size={"2x"} className="mitten" />
              </div>
              <div className="intro-bottom-row">
                <h2>Welcome to my website.</h2>
              </div>
              <img src={profpic} />
            </div>
          )
        }
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
            assetHidden={connectFourHidden}
          />

          <ProjectCardLocal
            title={card2.title}
            description={card2.description}
            image={card2.image}
            onClickHandler={fileTreeHandler}
            assetHidden={fileTreeHidden}
          />
        </div>

        {
          // For now ConnectFour and FileTree need to stay rendered,
          // to animate properly when activated. Memoization helps optimize

          //!connectFourHidden &&
          <ConnectFour connectFourHidden={connectFourHidden} />
        }
        {!fileTreeHidden && <FileTree fileTreeHidden={fileTreeHidden} />}
        <div className="cards">
          <ProjectCardLocal
            title={card5.title}
            description={card5.description}
            image={card5.image}
            onClickHandler={fileTreeV2Handler}
            assetHidden={fileTreeV2Hidden}
          />
          <ProjectCardLocal
            title={card6.title}
            description={card6.description}
            image={card6.image}
            onClickHandler={userTableHandler}
            assetHidden={userTableHidden}
          />
        </div>
        {!fileTreeV2Hidden && (
          <FileTreeV2 fileTreeV2Hidden={fileTreeV2Hidden} />
        )}
        {!userTableHidden && <UserTable />}
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

const ProjectCardLocal = ({
  title,
  description,
  image,
  onClickHandler,
  assetHidden,
}) => {
  return (
    <div
      className={`project-card local ${assetHidden ? "" : "active"}`}
      onClick={onClickHandler}
    >
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
