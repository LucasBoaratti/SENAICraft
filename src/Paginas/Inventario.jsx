import { useEffect, useState } from "react";

export function Inventario() {
  const [figurinhas, setFigurinhas] = useState([]);

  useEffect(() => {
    // Carrega o inventário salvo no localStorage ao abrir a página
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setFigurinhas(armazenado);
  }, []);

  function limparInventario() {
    // pede confirmação ao usuário
    if (!window.confirm("Deseja realmente limpar o inventário?")) return;

    // remove o item do localStorage
    localStorage.removeItem("inventario");

    // atualiza o estado local para refletir a limpeza na UI
    setFigurinhas([]);
  }


  return (
    <main className="containerInventario">
      <section className="inventario">
        <h2 className="tituloInventario">Inventário</h2>
        {/* Caso o jogador ainda não tenha nenhuma figurinha */}
        {figurinhas.length === 0 ? (
          <p className="vazio">Você ainda não possui uma figurinha... Acerte mais perguntas para desbloquear.</p>
        ) : (
          <div className="grid">
            {figurinhas.map((f) => (
              <div key={f.id} className="figurinha">
                <img src={f.imagem} alt={f.respostaCorreta} />
              </div>
            ))}
            <div className="limparInventario">
              <button className="botaoLimparInventario" onClick={limparInventario}>
                Limpar Inventário
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
