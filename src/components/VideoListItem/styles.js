import styled, { css } from "styled-components";
import { media } from "../../style";

const WebkitBox = css`
  -webkit-box-orient: verticali;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const NonDesktop = css`
  align-items: flex-start;
  margin: 0;
  opacity: 1;
  padding: 0;
  display: flex;
`;

export const VideoListItemContainer = styled.div`
  cursor: pointer;
  display: block;
  margin: 0.5em 0;
  padding: 0 0.5em;
  position: relative;
  width: 25%;

  &:hover {
    img {
      filter: grayscale(100%);
      opacity: 0.2;
    }

    div {
      opacity: 1;
    }
  }

  ${media.tablet`
    ${NonDesktop}
  `}

  ${media.mobile`
    ${NonDesktop}
    width: 50%;
  `};
`;

export const Thumbnail = styled.img`
  height: auto;
  margin-right: 0.5em;
  transition: 0.5s ease;
  width: 100%;

  ${media.tablet`
    opacity: 0.4;
  `};

  ${media.mobile`
    opacity: 0.4;
  `};
`;

export const Description = styled.div`
  left: 50%;
  opacity: 0;
  padding: 0.5em 1em;
  position: absolute;
  text-align: center;
  top: 50%;
  transition: 0.5s ease;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 100%;

  ${media.tablet`
    opacity: 1;
  `};

  ${media.mobile`
    opacity: ${p => p.loading ? 0 : 1};
  `};
`;

export const Title = styled.h5`
  ${media.tablet`
    ${WebkitBox}
    height: 48px;
    margin: 0;
    font-weight: bold;
  `};

  ${media.mobile`
    ${WebkitBox}
    margin: 0;
    font-weight: bold;
  `};
`;

export const Overview = styled.p`
  ${WebkitBox} color: rgba(0, 0, 0, 0.8);
  font-size: 0.75em;
  height: 60px;
  line-height: 20px;
  margin: 0.5em 0;

  ${media.tablet`
    display: none;
  `};

  ${media.mobile`
    display: none;
  `};
`;
