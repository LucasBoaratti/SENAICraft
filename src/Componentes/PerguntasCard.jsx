import BannerVermelho from "../assets/Images/Banner_Vermelho.png";
import BannerMagenta from "../assets/Images/Banner_Magenta.png";

export function PerguntasCard({ missao, onIniciarMissao, concluida }) {
  // Mudando o banner de acordo com a pergunta concluída
  const banner = concluida ? BannerMagenta : BannerVermelho;
  const alt = concluida ? "Pergunta concluída" : "Pergunta não respondida";

  return (
    // Banners das perguntas
    <img src={banner} alt={alt} className={`bannerPerguntas ${concluida ? "perguntaRespondida" : ""}`} style={{ top: `${missao.y}px`, left: `${missao.x}px` }} onClick={() => {
      // Se a pergunta não foi respondida ainda
      if (!concluida) {
        onIniciarMissao(missao);
      }}
    } />
  );
}
