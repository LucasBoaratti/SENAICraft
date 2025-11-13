import { useState } from "react";
import { missoes } from '../Dados/dadosMissao';
import { PerguntasCard } from '../Componentes/PerguntasCard';
import { MissaoModal } from '../Componentes/MissaoModal';

export function Perguntas() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState([]);

  function concluirMissao(id) {
    setMissoesConcluidas((prev) => [...prev, id]); // adiciona id no array
    setMissaoSelecionada(null); // fecha modal
  };

  return (
    <main className="container">
      <section className='containerPerguntas'>
        <h2 className="tituloPerguntas">Perguntas</h2>
        <div className="missoes-grid">
          {missoes.map((m) => (
            <PerguntasCard
              key={m.id} 
              missao={m}
              onIniciarMissao={setMissaoSelecionada} 
              concluida={missoesConcluidas.includes(m.id)} 
            />
          ))}
        </div>

        {missaoSelecionada && (
          <PerguntasCard 
            missao={missaoSelecionada} 
            onClose={() => setMissaoSelecionada(null)} 
            onConcluir={() => concluirMissao(missaoSelecionada.id)} 
          />
        )}
      </section>
    </main>
  );
}
