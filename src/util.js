import { v4 as uuidv4 } from "uuid";

function musicList() {
  return [
    {
      name: "It's Okay",
      artist: "Yasper",
      coverURL:
        "https://cloudinary-cdn.ffm.to/s--J0kXJLWX--/f_webp/https%3A%2F%2Fimagestore.ffm.to%2Flink%2F8b95c701442b3ad6bf201810e471d57f.jpeg",
      songURL: "https://cdn.pixabay.com/audio/2023/09/17/audio_93a5eb3c34.mp3",
      color: "rgb(254,195,127)",
      id: uuidv4(),
      active: true,
    },
    {
      name: "Glossy",
      artist: "Coma Media",
      coverURL:
        "https://cdn.pixabay.com/audio/2023/08/31/14-35-42-339_200x200.jpg",
      songURL: "https://cdn.pixabay.com/audio/2023/09/25/audio_b475db93de.mp3",
      color: "rgb(231, 131, 131)",
      id: uuidv4(),
      active: false,
    },
    {
      name: "Science Documentary",
      artist: "Lexin Music",
      coverURL:
        "https://cdn.pixabay.com/audio/2023/10/03/13-09-30-424_200x200.jpg",
      songURL: "https://cdn.pixabay.com/audio/2023/10/03/audio_ff0e1ce26c.mp3",
      color: "rgb(190,190,190)",
      id: uuidv4(),
      active: false,
    },
    {
      name: "Titanium",
      artist: "Alisha Sutudo",
      coverURL:
        "https://cdn.pixabay.com/audio/2023/10/06/12-10-40-317_200x200.png",
      songURL: "https://cdn.pixabay.com/audio/2023/10/06/audio_14f9198f0b.mp3",
      color: "rgb(209,141,227)",
      id: uuidv4(),
      active: false,
    },
    {
      name: "Baby Mandala",
      artist: "prazhanal",
      coverURL:
        "https://cdn.pixabay.com/audio/2023/10/03/03-34-18-650_200x200.jpg",
      songURL: "https://cdn.pixabay.com/audio/2023/09/30/audio_bd797ed8d0.mp3",
      color: "rgb(141,153,141)",
      id: uuidv4(),
      active: false,
    },
    {
      name: "Once in Paris",
      artist: "Pumpupthemind",
      coverURL:
        "https://cdn.pixabay.com/audio/2023/07/24/10-52-42-490_200x200.jpg",
      songURL: "https://cdn.pixabay.com/audio/2023/09/29/audio_0eaceb1002.mp3",
      color: "rgb(129,101,146)",
      id: uuidv4(),
      active: false,
    },
    {
      name: "Chillout Hip Hop Track - Come With Me",
      artist: "Keyframe Audio",
      coverURL:
        "https://cdn.pixabay.com/audio/2023/01/15/23-35-30-9_200x200.jpg",
      songURL: "https://cdn.pixabay.com/audio/2023/01/16/audio_0664325262.mp3",
      color: "rgb(130, 149, 243)",
      id: uuidv4(),
      active: false,
    },
    {
      name: "Tokyo Cafe",
      artist: "TVARI",
      coverURL:
        "https://cdn.pixabay.com/audio/2023/07/22/02-53-18-138_200x200.jpg",
      songURL: "https://cdn.pixabay.com/audio/2023/07/22/audio_720626056a.mp3",
      color: "rgb(222,135,74)",
      id: uuidv4(),
      active: false,
    },
    {
      name: "Titanium",
      artist: "Alisha_Sutudo",
      coverURL:
        "https://cdn.pixabay.com/audio/2023/10/06/12-10-40-317_200x200.png",
      songURL: "https://cdn.pixabay.com/audio/2023/10/06/audio_14f9198f0b.mp3",
      color: ["#c97f7f", "#4eaf45"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Titanium",
      artist: "Alisha_Sutudo",
      coverURL:
        "https://cdn.pixabay.com/audio/2023/10/06/12-10-40-317_200x200.png",
      songURL: "https://cdn.pixabay.com/audio/2023/10/06/audio_14f9198f0b.mp3",
      color: ["#c97f7f", "#4eaf45"],
      id: uuidv4(),
      active: false,
    },
  ];
}

export default musicList;
