import { Cabecalho } from "../Componentes/Cabecalho";
import { Outlet } from "react-router-dom";
import { Menu } from "../Componentes/Menu";

export function Inicial() {
  return (
    <>
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh",
      }}>
        <Cabecalho/>
        <div style={{ flex: "1" }}>
          <Outlet/>
        </div>
        <Menu/>
      </div>
    </>
  );
}
