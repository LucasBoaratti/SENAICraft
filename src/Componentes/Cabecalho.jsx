import Logo_SENAICraft from "../assets/Images/Logo_SENAICraft.png";

export function Cabecalho() {
    return (
        // Cabeçalho
        <header className="cabecalho">
            <img src={Logo_SENAICraft} alt="Logo SENAICraft." className="logo" />
        </header>
    );
}