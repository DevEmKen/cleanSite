import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const ProjectCardLocal = ({ title, description, image }) => {
  return (
    <div className="project-card">
      <h1>{title}</h1>
      <img src={image}></img>
      <h3>{description}</h3>
      <FontAwesomeIcon
        icon={faAngleDown}
        style={{ gridRowStart: "8", paddingBottom: "10px" }}
      />
    </div>
  );
};

export default ProjectCardLocal;
