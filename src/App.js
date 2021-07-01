import './App.css';
import { BrowserRouter } from 'react-router-dom'
import NavBar from './NavBar'
import Routes from './Routes'
import StockProvider from './StockProvider'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <StockProvider>
          <NavBar />
          <Routes />
        </StockProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
