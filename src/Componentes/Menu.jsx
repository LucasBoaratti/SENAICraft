import Livro_Pena from "../assets/Images/Livro_Pena.png";
import Inventario from "../assets/Images/Inventário.png";
import GeoLocalizacao from "../assets/Images/GeoLocalização.png";
import Camera from "../assets/Images/Câmera.png";
import { useNavigate } from "react-router-dom";

export function Menu() {
    const navigate = useNavigate();

    // Funções para avançar pelas páginas através do menu
    function avancarPaginaPerguntas() {
        navigate("perguntas");
    }

    function avancarPaginaInventario() {
        navigate("inventario");
    }

    // -- Função para avançar para a página de geolocalização será adicionada em breve --
    // function avancarPaginaInventario() {
    //     navigate("geoLocalizacao");
    // }

    function avancarPaginaCamera() {
        navigate("camera");
    }
    

    return (
        // Menu de opções
        <footer className="rodape">
            <section className="menu">
                <div className="perguntas" aria-label="Abrir perguntas" onClick={avancarPaginaPerguntas} role="button" tabIndex="0" onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        avancarPaginaPerguntas();
                    }
                }}>
                    <p className="texto">Perguntas</p>
                    <img src={Livro_Pena} alt="Livro e Pena." className="imagemOpcao" />
                </div>
                <div className="inventario" aria-label="Abrir inventário" role="button" tabIndex="0" onClick={avancarPaginaInventario} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        avancarPaginaInventario();
                    }
                }}>
                    <p className="texto">Inventário</p>
                    <img src={Inventario} alt="Saco com itens (Trouxa)." className="imagemOpcao" />
                </div>
                {/* Terá o onClick em breve... */}
                <div className="geoLocalizacao" aria-label="Abrir geo-localização" role="button" tabIndex="0"> 
                    <p className="texto">GeoLocalização</p>
                    <img src={GeoLocalizacao} alt="Mapa com riscos pretos." className="imagemOpcao" />
                </div>
                <div className="camera" role="button" tabIndex="0" aria-label="Abrir câmera e galeria" onClick={avancarPaginaCamera} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        avancarPaginaCamera();
                    }
                }}>
                    <p className="texto">Câmera</p>
                    <img src={Camera} alt="Luneta amarela e marrom." className="imagemOpcao" />
                </div>
            </section>
        </footer>
    );
}