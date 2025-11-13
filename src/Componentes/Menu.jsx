import Livro_Pena from "../assets/Images/Livro_Pena.png";
import Inventario from "../assets/Images/Inventário.png";
import GeoLocalizacao from "../assets/Images/GeoLocalização.png";
import Camera from "../assets/Images/Câmera.png";

export function Menu() {
    return (
        // Menu de opções
        <footer className="rodape">
            <section className="menu">
                <div className="perguntas">
                    <p>Perguntas</p>
                    <img src={Livro_Pena} alt="Livro e Pena." />
                </div>
                <div className="inventario">
                    <p>Inventário</p>
                    <img src={Inventario} alt="Saco com itens (Trouxa)." />
                </div>
                <div className="geoLocalizacao">
                    <p>GeoLocalização</p>
                    <img src={GeoLocalizacao} alt="Mapa com riscos pretos." />
                </div>
                <div className="camera">
                    <p>Câmera</p>
                    <img src={Camera} alt="Luneta amarela e marrom." />
                </div>
            </section>
        </footer>
    );
}