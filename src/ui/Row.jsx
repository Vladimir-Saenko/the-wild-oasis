import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      text-align: center;
      margin-bottom: 2rem;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
