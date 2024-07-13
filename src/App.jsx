import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: var(--color-brand-500);
  color: var(--color-brand-50);
`;

function App() {
  return (
    <>
      <GlobalStyles /> {/* Загрузка глобальных стилей */}
      <H1>The Wild Oasis</H1>
    </>
  );
}

export default App;
