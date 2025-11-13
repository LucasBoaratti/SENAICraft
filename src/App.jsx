import { BrowserRouter } from 'react-router-dom';
import { Rotas } from './Rotas/Rotas';

function App() {
  return (
    // Divisão criada para a imagem de fundo
    <div className="opacidade">
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </div>
  );
}

export default App;