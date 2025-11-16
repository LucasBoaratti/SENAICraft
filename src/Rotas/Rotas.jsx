import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Paginas/Inicial";
import { SENAICraft } from "../Paginas/SENAICraft";
import { Perguntas} from "../Paginas/Perguntas";
import { Inventario } from "../Paginas/Inventario";
import { Galeria } from "../Paginas/Galeria";
import { Introducao } from "../Paginas/Introducao";

export function Rotas() {
    return (
        <Routes>
            <Route path="/" element={<Introducao />} />
            <Route path="/SENAICraft" element={<Inicial/>}> 
                <Route index element ={<SENAICraft/>} />
                <Route path="perguntas" element={<Perguntas/>} />
                <Route path="inventario" element={<Inventario/>} />
                <Route path="camera" element={<Galeria/>} />
            </Route>
        </Routes>
    );
}   