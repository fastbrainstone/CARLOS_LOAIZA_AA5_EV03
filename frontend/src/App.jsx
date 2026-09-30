import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Registro from "./pages/registro";
import MisCursos from "./pages/MisCursos";
import Usuarios from "./pages/usuarios";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Inicio />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/registro"
                    element={<Registro />}
                />

                <Route
                    path="/mis-cursos"
                    element={<MisCursos />}
                />

                <Route
                    path="/usuarios"
                    element={<Usuarios />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;