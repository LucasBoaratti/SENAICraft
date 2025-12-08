import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Ghost from "../assets/Images/GhostTriste.jpg";
import Thifs from "../assets/Images/Thifszeira.webp";
import Vinicinho from "../assets/Images/Vinicinho.webp";
import Marcinha from "../assets/Images/Marcinha.webp";
import Dorival from "../assets/Images/Dorival.jpg";
import Modesto from "../assets/Images/Modesto.webp";
import Lilica from "../assets/Images/Lilica.webp";
import Mary from "../assets/Images/Mary.png";
import Pedrinho from "../assets/Images/Pedrinho.webp";
import Ari from "../assets/Images/Ari.jpg";
import Duda from "../assets/Images/Duda.webp";
import Jokita from "../assets/Images/Jokita.webp";
import Fer from "../assets/Images/Fer.png";
import Lindomar from "../assets/Images/Lindomar.webp";
import Israel from "../assets/Images/Israel.webp";
import Gri from "../assets/Images/Gri.webp";
import Gabriela from "../assets/Images/Gabriela.jpg";
import Nico from "../assets/Images/Nico.webp";
import Ge from "../assets/Images/Ge.webp";
import Eve from "../assets/Images/Eve.webp";
import Lucas from "../assets/Images/Lucas.jpg";
import Tata from "../assets/Images/Tata.webp";
import Adegas from "../assets/Images/Adegas.webp";
import Vinicius from "../assets/Images/Vinicius.png";
import Agatha from "../assets/Images/AgathaFreitax.webp";
import Francis from "../assets/Images/Francis.png";
import Cleber from "../assets/Images/Clebinho.webp";
import Vanessa from "../assets/Images/Nessa.webp";
import Vitoria from "../assets/Images/Favaro.webp";
import Plinio from "../assets/Images/Gabriel.png";
import Fuzari from "../assets/Images/Fuzuario.webp";
import Luca from "../assets/Images/Luquinha.webp";
import Willson from "../assets/Images/Will.webp";
import Leonardo from "../assets/Images/Leonardo.webp";
import Giovanna from "../assets/Images/Gigi.png";
import FrancisFranquini from "../assets/Images/Francis.png";
import Paulinho from "../assets/Images/Paulo.webp";
import Augusto from "../assets/Images/Augusto.png";
import Enzinho from "../assets/Images/Enzinho.png";

// Schema de validação com o Zod
const schemaResposta = z.object({
  // Regex que verifica se a resposta contém apenas letras maiúsculas ou minúsculas
  resposta: z.string()
    .min(1, "Por favor, digite uma resposta.")
    .max(15, "A resposta não pode passar de 15 caracteres.")
    .regex(
      /^[A-Za-z]+$/, {
        message: "Por favor, digite até 15 caracteres.",
    }),
});

// Lista/dicionário com as imagens de sucesso de perguntas acertadas
const imagensAcerto = {
  1: Thifs,
  2: Vinicinho,
  3: Marcinha,
  4: Dorival,
  5: Modesto,
  6: Lilica,
  7: Mary,
  8: Pedrinho,
  9: Ari,
  10: Duda,
  11: Jokita,
  12: Fer,
  13: Lindomar,
  14: Israel,
  15: Gri,
  16: Gabriela,
  17: Nico,
  18: Ge,
  19: Eve,
  20: Lucas,
  21: Tata,
  22: Adegas,
  23: Vinicius,
  24: Vinicius,
  25: Modesto,
  26: Agatha,
  27: Fer,
  28: Francis,
  29: Cleber,
  30: Vanessa,
  31: Enzinho,
  32: Gri,
  33: Lucas,
  34: Augusto,
  35: Vitoria,
  36: Plinio,
  37: Fuzari,
  38: Luca,
  39: Willson,
  40: Eve,
  41: Leonardo,
  42: Giovanna,
  43: Gabriela,
  44: Thifs,
  45: FrancisFranquini,
  46: Pedrinho,
  47: Paulinho,
  48: Gri,
  49: Nico,
  50: Lucas,
}

export function PerguntasModal({ missao, onClose, onConcluir }) {
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaResposta),
  });

  function verificarResposta(data) {
    const resposta = data.resposta;

    // Verificando se a resposta está correta
    if (
      resposta.trim().toLowerCase() ===
      missao.respostaCorreta.trim().toLowerCase()
    ) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");
      
      // Buscando as imagens para exibir no inventário
      const inventarioImagens = JSON.parse(localStorage.getItem("inventario")) || [];

      // Adicionando a imagem no localStorage
      inventarioImagens.push({
        id: missao.id,
        nome: missao.respostaCorreta,
        imagem: missao.imagem,
      });

      // Salvando como array
      localStorage.setItem("inventario", JSON.stringify(inventarioImagens));

      // ✅ chama a função de concluir após 2,5s (tempo para mostrar feedback)
      setTimeout(() => {
        onConcluir(missao.id);
      }, 2500);
    } else {
      setResultado("Resposta incorreta! Tente novamente.");
      setStatus("erro");
    }
  }

  return (
    <section className="containerModal" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="titulo" id="titulo-missao">
          {missao.titulo}
        </h2>
        <p id="descricao-missao" className="descricaoPergunta">{missao.descricao}</p>
        <form onSubmit={handleSubmit(verificarResposta)}>
          <label htmlFor="resposta" className="labelPergunta">
            Sua resposta:
          </label>
          <input
            className="caixaTexto"
            id="resposta"
            type="text"
            placeholder="Digite sua resposta..."
            {...register("resposta")}
          />
          {/* Exibindo o erro caso o usuário faça algo errado */}
          {errors.resposta && <p className="erro">{errors.resposta.message}</p>}
          <div className="modal-botoes">
            <button type="submit" className="botao">Enviar</button>
            <button type="button" onClick={onClose} className="botao">Fechar</button>
          </div>
        </form>
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
