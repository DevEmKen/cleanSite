import Projects from "./Projects";

const ProfilePage = ({ currSong, musicMax }) => {
  const songColor = {
    background: `linear-gradient(to top, #3978ff2b, #ffffff)`,
  };
  return (
    <div
      className={`prof-page ${musicMax ? "" : "music-min"}`}
      style={songColor}
    >
      <Projects currSong={currSong} />
    </div>
  );
};

export default ProfilePage;
