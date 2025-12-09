import { useRef, useState, useEffect } from "react";
import L from "leaflet"; // Objeto principal da bilbioteca leaflet
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export function GeoLocalizacao() {
    const mapRef = useRef(null);
    const rotaRef = useRef(null);

    const [form, setForm] = useState({
        lat1: "",
        lng1: "",
        lat2: "",
        lng2: "",
    });

    const [erros, setErros] = useState({});

    useEffect(() => {
        if (mapRef.current) return;

        const mapa = L.map("mapa").setView([-23.55, -46.63], 13);
        mapRef.current = mapa;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(mapa);
    }, []);

    // Função que valida os campos de latitude e longitude da origem
    function validarCampos() {
        let temp = {};

        if (!form.lat1) temp.lat1 = "Informe a latitude da origem, por favor.";
        if (!form.lng1) temp.lng1 = "Informe a longitude da origem, por favor.";
        if (!form.lat2) temp.lat2 = "Informe a latitude do destino, por favor.";
        if (!form.lng2) temp.lng2 = "Informe a longitude do destino, por favor.";

        setErros(temp);

        return Object.keys(temp).length === 0;
    }

    // Função que irá gerar a rota para exibir em um mapa
    function gerarRota(e) {
        e.preventDefault(); // Evita que o formulário dispare um POST/GET e recarregue a página

        if(!validarCampos()) return; // Validação para ver se tem valores válidos

        const lat1 = parseFloat(form.lat1);
        const lng1 = parseFloat(form.lng1);
        const lat2 = parseFloat(form.lat2);
        const lng2 = parseFloat(form.lng2);

        // Validação para ver se o usuário digitou texto ao invés de números
        if (isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) {
            setErros({
                geral: "Coordenadas inválidas",
            });
            return;
        }

        const p1 = L.latLng(lat1, lng1);
        const p2 = L.latLng(lat2, lng2);

        if (rotaRef.current) rotaRef.current.remove(); // Se o usuário gerar uma nova rota, precisamos limpar a antiga para não desenhar várias rotas sobre o mapa

        rotaRef.current = L.Routing.control({
            waypoints: [p1, p2], // Os pontos da rota
            show: false, // Oculta o painel lateral de direções
            addWaypoints: false,
            draggableWaypoints: false, // Evita edição da rota via UI
            lineOptions: { // Estilizando a linha da rota
                styles: [{
                    color: 'blue',
                    weight: 4,
                }],
            }, // Ajustes extras da linha
        }).addTo(mapRef.current);

        mapRef.current.fitBounds([p1, p2]);
    }

    // Função que pega a localização atual
    function localizacaoOrigem() {
        // Usa o GPS do dispositivo e formata para 6 casas decimais, legível e suficiente para precisão de metros
        navigator.geolocation.getCurrentPosition((pos) => {
            setForm({
                ...form,
                lat1: pos.coords.latitude.toFixed(6),
                lng1: pos.coords.longitude.toFixed(6),
            });
        });
    }

    // Função que pega a localização do destino
    function localizacaoDestino() {
        // Usa o GPS do dispositivo e formata para 6 casas decimais, legível e suficiente para precisão de metros
        navigator.geolocation.getCurrentPosition((pos) => {
            setForm({
                ...form,
                lat2: pos.coords.latitude.toFixed(6),
                lng2: pos.coords.longitude.toFixed(6),
            });
        });
    }

    return (
        <main className="containerMapa">
            <section className="sessaoMapa">
                <form className="formMapa" onSubmit={gerarRota}>
                    <h1 className="tituloGeolocalizacao">GeoLocalização</h1>
                    {/* Origem */}
                    <div className="coordenadasOrigem">
                        <legend className="origem">Origem</legend>

                        <label>Latitude</label>
                        <input type="number" name="lat1" step="any" value={form.lat1} onChange={(e) => setForm({ ...form, lat1: e.target.value })} className="caixaTexto" placeholder="Ex: 00,000000" />
                        {erros.lat1 && <p className="error">{erros.lat1}</p>}

                        <label>Longitude</label>
                        <input type="number" name="lng1" step="any" value={form.lng1} onChange={(e) => setForm({ ...form, lng1: e.target.value })} className="caixaTexto" placeholder="Ex: 00,000000" />
                        {erros.lng1 && <p className="error">{erros.lng1}</p>}

                        <div className="botaoLocal">
                            <button type="button" className="btnLocal" onClick={localizacaoOrigem}>Usar minha localização atual</button>
                        </div>
                    </div>
                    {/* Destino */}
                    <div className="coordenadasDestino">
                        <legend className="destino">Destino</legend>

                        <label>Latitude</label>
                        <input type="number" name="lat2" step="any" value={form.lat2} onChange={(e) => setForm({ ...form, lat2: e.target.value })} className="caixaTexto" placeholder="Ex: 00,000000" />
                        {erros.lat2 && <p className="error">{erros.lat2}</p>}

                        <label>Longitude</label>
                        <input type="number" name="lng2" step="any" value={form.lng2} onChange={(e) => setForm({ ...form, lng2: e.target.value })} className="caixaTexto" placeholder="Ex: 00,000000" />
                        {erros.lng2 && <p className="error">{erros.lng2}</p>}

                        <div className="botaoLocal">
                            <button type="button" className="btnLocal" onClick={localizacaoDestino}>Usar minha localização atual</button>
                        </div>
                    </div>
                    <div className="botao">
                        <button type="submit" className="btnGerar">Gerar rota</button>
                    </div>
                </form>

                <div id="mapa" className="mapaContainer"></div>
            </section>
        </main>
    );
}