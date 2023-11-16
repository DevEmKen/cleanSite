const ProjectCard = ({ title, description, image }) => {
  return (
    <div className="project-card">
      <h1>{title}</h1>
      <img src={image}></img>
      <h3>{description}</h3>
    </div>
  );
};

export default ProjectCard;
