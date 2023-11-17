import Projects from "./Projects";

const ProfilePage = ({ currSong, musicMax }) => {
  const Bad = () => {
    return (
      <div>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <img src={currSong.coverURL} style={{ width: "200px" }}></img>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
      </div>
    );
  };
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
