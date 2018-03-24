import React from "react";
import PropType from "prop-types";

const HeroVideo = ({ id, mute = 1, snippet }) => {
  const renderHeroVideo = () => {
    if (id && id.videoId) {
      return (
        <div>
          <iframe
            src={`https://youtube.com/embed/${
              id.videoId
            }?autoplay=1&rel=0&mute=${mute}`}
            title={snippet.title}
          />
          <h2>{`${snippet.title} — ${snippet.channelTitle}`}</h2>
        </div>
      );
    } else {
      return <div className="placeholder" />;
    }
  };

  return renderHeroVideo();
};

HeroVideo.propType = {
  id: PropType.string.isRequired,
  snippet: PropType.object.isRequired
};

export default HeroVideo;
