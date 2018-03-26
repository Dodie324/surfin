import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const HeroContainer = styled.div`
  align-items: center;
  background-color: black;
  display: flex;
  flex-direction: column;
  padding-top: 6em;
`;

const Iframe = styled.iframe`
  border-width: 0;
  height: 350px;
  width: 50%;
`;

const StyledH2 = styled.h2`
  color: white;
  font-weight: lighter;
  margin-bottom: 1em;
`;

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
