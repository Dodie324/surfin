import React from "react";
import PropTypes from "prop-types";

import { HeroContainer, Iframe, StyledH2 } from "./styles";

const HeroVideo = ({ id, mute = 1, snippet }) => {
  const renderHeroVideo = () => (
    <HeroContainer>
      <Iframe
        src={`https://youtube.com/embed/${
          id.videoId
        }?autoplay=1&rel=0&mute=${mute}`}
        title={snippet.title}
      />
      <StyledH2>{`${snippet.title} — ${snippet.channelTitle}`}</StyledH2>
    </HeroContainer>
  );

  return renderHeroVideo();
};

HeroVideo.propTypes = {
  id: PropTypes.object.isRequired,
  mute: PropTypes.number,
  snippet: PropTypes.object.isRequired
};

export default HeroVideo;
