import { BrowserRouter } from 'react-router-dom';
import { Rotas } from './Rotas/Rotas';

function App() {
  return (
    <>
      <div className="opacidade" />
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </>
  );
}

export default App;