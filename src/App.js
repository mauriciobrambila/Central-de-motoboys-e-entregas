import Tela404 from "./telas/Tela404";
import TelaMenu from "./telas/TelaMenu";
import TelaCadMotoboys from "./telas/TelaCadMotoboys";
import TelaCadEntrega from "./telas/TelaCadEntrega";
import TelaCadastroPedidos from "./telas/TelaCadPedidos";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastroMotoboys" element={<TelaCadMotoboys/>}/>
          <Route path="/cadastroEntrega" element={<TelaCadEntrega/>}/>
          <Route path="/cadastroPedidos" element={<TelaCadastroPedidos/>}/>
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
