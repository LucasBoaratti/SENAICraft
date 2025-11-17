// Ref: é o hook que permite que eu interaja com os periféricos do usuários
import { useState, useEffect, useRef } from "react";
import { Galeria } from "../Paginas/Galeria";

export function Camera({ onFotoTirada, esconderGaleria, mostrarGaleria }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [foto, setFoto] = useState(null);

    // Inicializa a câmera
    useEffect(() => {
        iniciarCamera();
    }, []);

    async function iniciarCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        }
        catch(error) {
            console.error("Erro ao buscar vídeo/imagem: ", error);
        }
    }

    function tirarFoto() {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imagem = canvas.toDataURL("image/png");

        setFoto(imagem);

        if (onFotoTirada) {
            // Permite a comunicação com as props
            onFotoTirada(imagem);
        }
        
        // Não exibe a galeria após tirar a foto
        if (esconderGaleria) {
            esconderGaleria();
        }
    }

    function reiniciar() {
        setFoto(null);
        iniciarCamera();
    }

    return (
        <main>
            <section className="camera-box">
                <h2 className="tituloCamera">Captura de imagem</h2>
                <div className="preview">
                    {!foto ? (
                        <video ref={videoRef} autoPlay playsInline aria-label="Fluxo de câmera"/>
                    ) : (
                        <img src={foto} alt="Foto capturada" />
                    )}
                </div>
                <div className="botoesFoto">
                    {!foto ? (
                        <button type="button" onClick={tirarFoto} className="tirarFoto">Tirar foto</button>
                    ) : (
                        <div className="fotoGaleria">
                            <button type="button" onClick={reiniciar} className="novaFoto">Nova foto</button>
                            <button type="button" onClick={mostrarGaleria} className="mostrarGaleria">Mostrar galeria</button>
                        </div>
                    )
                    }
                </div>
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </section>
        </main>
    );
}