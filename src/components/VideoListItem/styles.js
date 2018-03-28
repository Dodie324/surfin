import styled, { css } from "styled-components";
import { media } from "../../style";

const WebkitBox = css`
  -webkit-box-orient: verticali;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

export const VideoListItemContainer = styled.div`
  cursor: pointer;
  display: block;
  margin: 0.5em 0;
  padding: 0 0.5em;
  width: 18%;

  ${media.mobile`
    margin: 0;
    width: ${p => p.isVideoDetail ? '50%' : '33%'};
  `};
`;

export const Thumbnail = styled.img`
  height: auto;
  margin-right: 0.5em;
  width: 100%;
`;

export const Description = styled.div`
  padding: 0.5em 0;
`;

export const Title = styled.h5`
  ${WebkitBox} height: 48px;
  margin: 0;

  ${media.mobile`
    font-size: .75em;
  `};
`;

export const Overview = styled.p`
  ${WebkitBox} color: rgba(0, 0, 0, 0.6);
  font-size: 0.75em;
  height: 60px;
  line-height: 20px;
  margin: 0.5em 0;

  ${media.mobile`
    display: none;
  `};
`;
