import { css, keyframes } from "styled-components";

export const layouts = {
  desktop: 1200,
  tablet: 768,
  mobile: 550
};

export const media = Object.keys(layouts).reduce((styles, type) => {
  styles[type] = (...args) => css`
    @media (max-width: ${layouts[type] / 16}em) {
      ${css(...args)}
    }
  `;
  return styles;
}, {});

export const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const BaseLayout = `
  margin: 0 auto;
  max-width: 1200px;
`;

export const BaseListStyle = `
  ${BaseLayout}
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  padding-top: 1em;
`;

export const BaseMessageStyle = `
  align-items: center;
  background-color: #f6f8fb;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: flex;
  font-size: .75em;
  justify-content: center;
  margin-bottom: 1em;
  padding: 1em;
  text-transform: uppercase;
`;
