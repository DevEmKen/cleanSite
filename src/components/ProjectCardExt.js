import githubpng from "../assets/githubpng.png";
import googleplaypng from "../assets/googleplaypng.png";

const ProjectCardExt = ({ title, description, image, google, github }) => {
  const gitHandler = () => {
    window.open(github, "_blank", "noreferrer");
    console.log("github");
  };
  const googleHandler = () => {
    window.open(google, "_blank", "noreferrer");
  };

  return (
    <div className="project-card">
      <h1>{title}</h1>
      <img src={image}></img>
      <h3>{description}</h3>
      <div className="external-proj">
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

export default ProjectCardExt;
