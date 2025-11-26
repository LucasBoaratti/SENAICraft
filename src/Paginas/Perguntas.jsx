import { useEffect, useState } from "react";
import { missoes } from '../Dados/dadosMissao';
import { PerguntasCard } from '../Componentes/PerguntasCard';
import { PerguntasModal } from '../Componentes/PerguntasModal';
import MapaPerguntas from "../assets/Images/Mapa_Perguntas.png";

export function Perguntas() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState([]);
  const [inventario, setInventario] = useState([]); // Estado que controla se o inventário está limpo ou não

  function concluirMissao(id) {
    setMissoesConcluidas((prev) => [...prev, id]); // adiciona id no array
    setMissaoSelecionada(null); // fecha modal

    // Recarregando o inventário após atualizar
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setInventario(armazenado);
  };

  // Função que verifica se uma missão foi respondida
  function perguntaConcluida(idMissao) {
    return inventario.some((item) => item.id === idMissao);
  }

  // Carregando o inventário salvo no localstorage
  useEffect(() => {
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setInventario(armazenado);
  }, []);

  return (
    <main className="container">
      <section className='containerPerguntas'>
        <p className="tituloPerguntas">Esse aqui é o mapa das perguntas. Clique em qualquer banner para responder uma pergunta. E que a sorte esteja sempre com você!</p>
        <p className="tituloPerguntas">Legenda: vermelho - não respondido ; magenta - respondido</p>
        <div className="missoes-grid">
          <div className="mapa">
            <img src={MapaPerguntas} alt="Mapa de perguntas." className="mapaPerguntas" />
            {missoes.map((m) => (
              <PerguntasCard
                key={m.id} 
                missao={m}
                onIniciarMissao={setMissaoSelecionada} 
                concluida={perguntaConcluida(m.id)} 
              />
            ))}
          </div>
        </div>
      </section>
      {/* Renderizando o modal após clicar no botão */}
      {missaoSelecionada && (
        <PerguntasModal
          missao={missaoSelecionada} 
          onClose={() => setMissaoSelecionada(null)} 
          onConcluir={() => concluirMissao(missaoSelecionada.id)} 
        />
      )}
    </main>
  );
}
