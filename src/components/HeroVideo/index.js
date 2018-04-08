import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { HeroContainer, Iframe, StyledH2 } from "./styles";

const HeroVideo = ({ mute = 1, video }) => {
  const renderHeroVideo = () => (
    <HeroContainer>
      <Iframe
        src={`https://youtube.com/embed/${
          video.id.videoId
        }?autoplay=1&rel=0&mute=${mute}`}
        title={video.snippet.title}
      />
      <StyledH2>{`${video.snippet.title} — ${
        video.snippet.channelTitle
      }`}</StyledH2>
    </HeroContainer>
  );

  return renderHeroVideo();
};

const mapStateToProps = ({ pageDetails, surfVideos }, ownProps) =>
  ownProps.loadFirstHit
    ? { video: surfVideos.videoData.items[0] }
    : { video: pageDetails.videoData };

HeroVideo.propTypes = {
  mute: PropTypes.number,
  video: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(HeroVideo);
