import './styles/main.scss';
import List from './components/List';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <List />
          </Col>
        </Row>
      </Container>
      {/* <List /> */}
    </div>
  );
}

export default App;
