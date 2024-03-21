import ReactPlayer from "react-player";
import { BaseUrl } from "../assets/Constants";
import { useState } from "react";

export default function VideoPlayer({ videoId, onClose }) {
  const [playing, setPlaying] = useState(true);
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
        <button
          className="absolute top-0 right-0 m-4 text-white text-xl focus:outline-2 z-0"
          onClick={() => {
            setPlaying(false);
            onClose();
          }}
        >
          X
        </button>
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="aspect-w-16 aspect-h-9">
            <ReactPlayer
              url={`${BaseUrl}${videoId}`}
              playing={playing}
              controls
              width="100%"
              height="100%"
              onEnded={() => {
                setPlaying(false);
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
