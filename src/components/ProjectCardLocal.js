import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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

export default ProjectCardLocal;
