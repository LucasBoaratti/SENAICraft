import { useState } from "react";
import Ghost from "../assets/Images/GhostTriste.jpg";
import Thifs from "../assets/Images/Thifszeira.webp";
import Vinicinho from "../assets/Images/Vinicinho.webp";
import Marcinha from "../assets/Images/Marcinha.webp";
import Dorival from "../assets/Images/Dorival.jpg";
import Modesto from "../assets/Images/Modesto.webp";
import Lilica from "../assets/Images/Lilica.webp";
import Pedrinho from "../assets/Images/Pedrinho.webp";
import Ari from "../assets/Images/Ari.jpg";
import Duda from "../assets/Images/Duda.webp";
import Jokita from "../assets/Images/Jokita.webp";
import Fer from "../assets/Images/Fer.png";
import Lindomar from "../assets/Images/Lindomar.webp";
import Israel from "../assets/Images/Israel.webp";
import Gri from "../assets/Images/Gri.webp";

// Lista/dicionário com as imagens de sucesso de perguntas acertadas
const imagensAcerto = {
  1: Thifs,
  2: Vinicinho,
  3: Marcinha,
  4: Dorival,
  5: Modesto,
  6: Lilica,
  // 7: Mariany,
  8: Pedrinho,
  9: Ari,
  10: Duda,
  11: Jokita,
  12: Fer,
  13: Lindomar,
  14: Israel,
  15: Gri,
}

export function PerguntasModal({ missao, onClose, onConcluir }) {
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);

  function verificarResposta() {
    if (!resposta.trim()) {
      alert("Por favor, digite uma resposta antes de enviar!");
      return;
    }

    if (
      resposta.trim().toLowerCase() ===
      missao.respostaCorreta.trim().toLowerCase()
    ) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");

      // ✅ chama a função de concluir após 2s (tempo para mostrar feedback)
      setTimeout(() => {
        onConcluir(missao.id);
      }, 2000);
    } else {
      setResultado("Resposta incorreta. Tente novamente!");
      setStatus("erro");
    }
  };

  return (
    <section className="containerModal" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="titulo" id="titulo-missao">
          {missao.titulo}
        </h2>
        <p id="descricao-missao" className="descricaoPergunta">{missao.descricao}</p>

        <label htmlFor="resposta" className="labelPergunta">
          Sua resposta:
        </label>
        <input
          className="caixaTexto"
          id="resposta"
          type="text"
          placeholder="Digite sua resposta..."
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          required
        />

        <div className="modal-botoes">
          <button onClick={verificarResposta} className="botao">Enviar</button>
          <button onClick={onClose} className="botao">Fechar</button>
        </div>

        {resultado && (
          <div className="resultado">
            <p>{resultado}</p>
            {status === "sucesso" && (
              <img
                src={imagensAcerto[missao.id]}
                alt="Missão concluída com sucesso"
                width="100"
              />
            )}
            {status === "erro" && (
              <img
                src={Ghost}
                alt="Erro na resposta da missão"
                width="100"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
