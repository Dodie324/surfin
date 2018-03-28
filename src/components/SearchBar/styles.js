import styled from "styled-components";
import { Search as SearchIcon } from "react-feather";

import { media } from "../../style";

export const SearchBarContainer = styled.div`
  display: flex;
  float: right;
  margin: 1em 2em;

  ${media.mobile`
    margin: 1em 0;
  `};
`;

export const StyledInput = styled.input`
  background-color: rgba(255, 255, 255, 0.125);
  border: none;
  box-shadow: inset 0 0 1px #ccc;
  color: #fff;
  padding: 2px 10px;
  border-radius: 2px 0 0 2px;
  font-size: 16px;
  line-height: 2;
  width: 250px;

  &:focus {
    outline: none;
  }

  ${media.mobile`
    font-size: 14px;
    width: 150px;
  `};
`;

export const ButtonContainer = styled.div`
  align-items: center;
  background-color: #eef1f2;
  border-radius: 0 2px 2px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  line-height: 2;
  margin: 0;
  padding: 2px 0;
  width: 65px;

  &:hover {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }
`;

export const Button = styled(SearchIcon)`
  cursor: pointer;
  height: 20px;
  stroke: #828282;
  width: 20px;
`;
