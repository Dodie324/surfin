import React from "react";
import PropType from "prop-types";
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
  height: 400px;
  width: 100%;
`;

const StyledH2 = styled.h2`
  color: white;
  font-weight: lighter;
  margin-bottom: 1em;
`;

const Placeholder = HeroContainer.extend`
  width: 100%;
  height: 568px;
`;

const HeroVideo = ({ id, mute = 1, snippet }) => {
  const renderHeroVideo = () => {
    if (id && id.videoId) {
      return (
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
    } else {
      return <Placeholder />;
    }
  };

  return renderHeroVideo();
};

HeroVideo.propType = {
  id: PropType.string.isRequired,
  snippet: PropType.object.isRequired
};

export default HeroVideo;
