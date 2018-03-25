import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const VideoListItemContainer = styled.div`
  cursor: pointer;
  display: block;
  margin: 0.5em 0;
  padding: 0 0.5em;
  width: 16.6666666667%;
`;

const Thumbnail = styled.img`
  height: auto;
  margin-right: 0.5em;
  width: 100%;
`;

const Description = styled.div`
  padding: .5em 0;
`;

const WebkitBox = css`
  -webkit-box-orient: verticali;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const Title = styled.h5`
  ${WebkitBox}
  height: 48px;
  margin: 0;
`;

const Overview = styled.p`
  ${WebkitBox}
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.75em;
  height: 60px;
  line-height: 20px;
  margin: 0.5em 0;
`

const VideoListItem = ({ id, loadPage, snippet }) => {
  const { description, thumbnails, title } = snippet;

  return (
    <VideoListItemContainer id={id} onClick={() => loadPage(id, snippet)}>
      <div>
        <Thumbnail alt={title} src={thumbnails.high.url} />
      </div>
      <Description>
        <Title>{title.toUpperCase()}</Title>
        <Overview>{description}</Overview>
      </Description>
    </VideoListItemContainer>
  );
};

VideoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  loadPage: PropTypes.func,
  snippet: PropTypes.object.isRequired
};

export default VideoListItem;
