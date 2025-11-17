import { Camera } from "../Componentes/Camera";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from "react";

export function Galeria() {
    const [galeria, setGaleria] = useState(false);
    const [fotos, setFotos] = useState(() => {
        const salvas = localStorage.getItem("fotos");
        return salvas ? JSON.parse(salvas) : [];
    });

    // Função de adicionar foto
    function adicionarFoto(novaFoto) {
        const novasFotos = [...fotos, novaFoto];
        setFotos(novasFotos);
        localStorage.setItem("fotos", JSON.stringify(novasFotos));
        setGaleria(false);
    }

    // Função para limpar a galeria
    function limparGaleria() {
        if (!confirm("Deseja limpar sua galeria?")) return;
        localStorage.removeItem("fotos");
        setFotos([]);
        setGaleria(false);
    }

    // Exibe a galeria ao clicar no botão "Mostrar galeria"
    function mostrarGaleria() {
        setGaleria(true);
    }

    return (
        <main className={`cameraGaleria ${galeria ? "bordaInferior" : ""}`}>
            {/* Renderiza a câmeria e depois a galeria, após o usuário clicar no botão de mostrar a galeria */}
            <Camera onFotoTirada={adicionarFoto} esconderGaleria={() => setGaleria(false)} mostrarGaleria={mostrarGaleria}/>
            {galeria && (
                <section className="containerGaleria">
                    <h2 className="tituloGaleria">Galeria de imagens</h2>
                    <section className="galeria">
                        <ImageList className="fotos" cols={3}>
                            {fotos.map((foto, index) => (
                                <ImageListItem key={index}>
                                    <img
                                        src={foto}
                                        alt={`Foto ${index + 1}`}
                                        loading="lazy"
                                        className="foto"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </section>
                    <div className="botaoGaleria">
                        <button type="button" onClick={limparGaleria} className="limparGaleria">Limpar galeria</button>
                    </div>
                </section>
            )}
        </main>
    );
}