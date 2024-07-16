import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import Row from "./ui/Row";

function App() {
  return (
    <>
      <GlobalStyles /> {/* Загрузка глобальных стилей */}
      <Row type="horizontal">
        <Heading as="h1">The Wild Oasis</Heading>
        <div>
          <Button
            size="medium"
            variation="primary"
            onClick={() => alert("Check In!")}
          >
            Check In
          </Button>
          <Button
            size="medium"
            variation="secondary"
            onClick={() => alert("Check Out!")}
          >
            Check Out
          </Button>
        </div>
      </Row>
      <Row>
        <Heading as="h2">Check and quit</Heading>
        <div>
          <div>
            <Button
              size="small"
              variation="primary"
              onClick={() => alert("Check In!")}
            >
              Check In
            </Button>
            <Button
              size="small"
              variation="danger"
              onClick={() => alert("Check Out!")}
            >
              Check Out
            </Button>
          </div>
        </div>
      </Row>
    </>
  );
}

export default App;
