import githubpng from "../assets/githubpng.png";
import googleplaypng from "../assets/googleplaypng.png";

const ProjectCardExt = ({ title, description, image, google, github }) => {
  return (
    <div className="project-card">
      <h1>{title}</h1>
      <img src={image}></img>
      <h3>{description}</h3>
      <div className="external-proj">
        <img src={githubpng} /> <h4>Github</h4>
        <div style={{ width: "2rem" }} />
        <img src={googleplaypng} /> <h4>Play Store</h4>
      </div>
    </div>
  );
};

export default ProjectCardExt;
