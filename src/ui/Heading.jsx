import styled, { css } from "styled-components";

const centerPosition = css`
  text-align: center;
`;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      background-color: var(--color-brand-500);
      color: var(--color-brand-50);
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      background-color: var(--color-brand-200);
    `}

  ${centerPosition}
`;

export default Heading;
