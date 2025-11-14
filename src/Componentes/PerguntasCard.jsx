export function PerguntasCard({ missao, onIniciarMissao, concluida }) {
  return (
    <article className="cardMissao">
      <h3 id={missao.id}>{missao.titulo}</h3>
      <p>{missao.missao}</p>
      <div className="botaoIniciar">
        <button onClick={() => onIniciarMissao(missao)} className="botao" disabled={concluida}>{concluida ? "Pergunta concluída" : "Iniciar pergunta"}</button>
      </div>
    </article>
  );
}
