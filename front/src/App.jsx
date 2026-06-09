import Home from './components/home';
import Login from './components/login';
import Registro from './components/registro';
import { BrowserRouter, Route, Routes , Link  } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
