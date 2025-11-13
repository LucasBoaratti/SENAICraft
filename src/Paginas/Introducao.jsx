import { useNavigate } from "react-router-dom";
import Logo_SENAICraft from "../assets/Images/Logo_SENAICraft.png";

export function Introducao() {
    const navigate = useNavigate();
    
    // Função para ir pra página Home do site
    function avancarPaginaHome() {
        navigate("/SENAICraft");
    }

    return (
        // Página de introdução
        <main className="boasVindas">
            <section className="introducao">
                <h1 className="textoBoasVindas">Seja bem-vindo(a) ao</h1>
                <img src={Logo_SENAICraft} alt="Logo SENAICraft" className="logo" />
                <div className="botaoIniciar">
                    <button type="button" className="botao" onClick={avancarPaginaHome} tabIndex={0}>Jogar</button>
                </div>
            </section>
        </main>
    );
}