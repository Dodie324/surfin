import styled from "styled-components";
import { media, BaseLayout } from "../../style";

export const FiltersContainer = styled.div`
  background-color: #fafbfc;
  border-bottom: 1px solid #ccc;
  padding: 1em 0;

  ${media.tablet`
    padding: 1em 2em;
  `};

  ${media.mobile`
    padding: 1em;
  `};
`;

export const Menu = styled.div`
  ${BaseLayout} align-items: center;
  display: flex;
  justify-content: ${props => (!props.children[0] ? "flex-end" : "flex-start")};
`;

export const CurrentFilter = styled.span`
  color: #ccc;
  flex: 1;
  font-size: 0.85em;
  text-transform: uppercase;

  ${media.mobile`
    font-size: .5em;
  `};
`;

export const IconContainer = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
`;

export const StyledSpan = styled.span`
  font-size: 0.85em;
  text-transform: uppercase;

  ${media.mobile`
    font-size: .75em;
  `};
`;

export const FilterGroups = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 1200px;

  ${media.mobile`
    font-size: .75em;
    margin-top: 1em;
  `};
`;

export const FilterList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const FilterListItem = styled.li`
  cursor: pointer;
  font-weight: lighter;
  padding: 0.25em 0;
`;

export const Title = styled.h4`
  border-bottom: 1px solid rgba(255, 255, 255, 0.125);
  font-weight: bold;
  margin-top: 0;
`;
