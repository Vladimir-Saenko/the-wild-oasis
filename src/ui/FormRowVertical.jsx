import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

// eslint-disable-next-line react/prop-types
function FormRowVertical({ label, fieldName, errorMessage, children }) {
  return (
    <StyledFormRow>
      <Label htmlFor={fieldName}>{label}</Label>
      {children}
      {errorMessage && <Error>{errorMessage}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
