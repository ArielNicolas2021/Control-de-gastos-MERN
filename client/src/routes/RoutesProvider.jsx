import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from "../pages/auth/Login.jsx";
import { Registro } from "../pages/auth/Registro.jsx";
import { Items } from "../pages/items/Items.jsx";
import { ProveedorContexto } from '../utils/Context.jsx';
import { Home } from '../pages/items/Home.jsx';

export const RoutesProvider = () => {
    return (
        <BrowserRouter>
            <ProveedorContexto>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/registro' element={<Registro />} />
                    <Route path='/items' element={<Items />} />
                    <Route path='/items/list' element={<Home />} />
                    <Route path='*' element={<h1>ERROR NO EXISTE LA PAGINA, 404</h1>} />
                </Routes>
            </ProveedorContexto>
        </BrowserRouter>
    )
}