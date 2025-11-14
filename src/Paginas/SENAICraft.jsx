import Balao_Fala from "../assets/Images/Balão_Fala.png";

export function SENAICraft(){
    return(
        // Página de boas vindas (Home)
        <main className="containerSENAICraft">
            <section className="personagem">
                <div className="containerBalaoFala">
                    <img src={Balao_Fala} alt="Personagem com balão de fala." className="balaoFala" />
                    <p className="textoBoasVindas">Olá! Eu sou o Lucas e vou te ajudar com as perguntas sobre a sala e os professores da 3DSMB-15. Vamos juntos nessa jornada do SENAICraft! Escolha uma opção para começar.</p>
                </div>
            </section>
        </main>
    );
}