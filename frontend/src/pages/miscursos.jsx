import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./misCursos.css";

function MisCursos() {

    const navigate = useNavigate();

    const usuarioGuardado = localStorage.getItem("usuario");

    const usuario = usuarioGuardado
        ? JSON.parse(usuarioGuardado)
        : null;

    const cerrarSesion = () => {
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    return (
        <div className="mis-cursos-page">

            {/* NAVBAR */}
            <nav className="navbar">

                <div className="nav-left">

                    <Link to="/" className="logo">
                        PILOSOS
                    </Link>

                    <div className="nav-links">

                        <div className="dropdown">

                            <button className="dropdown-btn">
                                Explorar ▾
                            </button>

                            <div className="dropdown-content">

                                <Link to="/quienes-somos">
                                    Quiénes somos
                                </Link>

                                <Link to="/nuestro-equipo">
                                    Nuestro equipo
                                </Link>

                                <Link to="/rutas-atencion">
                                    Rutas de atención
                                </Link>

                                <Link to="/noticias">
                                    Noticias
                                </Link>

                            </div>

                        </div>

                        <Link to="/mis-cursos">
                            Cursos
                        </Link>

                        <Link to="/progreso">
                            Progreso
                        </Link>

                        <Link to="/comunidad">
                            Comunidad
                        </Link>

                    </div>

                </div>

                <div className="nav-right">

                    <button
                        className="btn-cerrar"
                        onClick={cerrarSesion}
                    >
                        Cerrar sesión
                    </button>

                </div>

            </nav>


            {/* BIENVENIDA */}
            <main className="mis-cursos-container">

                <section className="bienvenida">

                    <h1>
                        Hola {usuario?.nombreUsuario || "Usuario"} 👋
                    </h1>

                    <p>
                        Bienvenido a PILOSOS.
                    </p>

                    <p className="bienvenida-texto">
                        Continúa aprendiendo y consulta tus cursos,
                        actividades y progreso.
                    </p>

                </section>


                {/* CURSOS */}
                <section className="cursos-section">

                    <div className="section-header">

                        <h2>
                            Mis cursos
                        </h2>

                        <p>
                            Consulta los cursos en los que estás participando.
                        </p>

                    </div>


                    <div className="cursos-grid">

                        <article className="curso-card">

                            <div className="curso-icon">
                                📚
                            </div>

                            <h3>
                                Curso de aprendizaje
                            </h3>

                            <p>
                                Accede a tus contenidos y actividades
                                de aprendizaje.
                            </p>

                            <button className="btn-curso">
                                Ver curso
                            </button>

                        </article>


                        <article className="curso-card">

                            <div className="curso-icon">
                                📝
                            </div>

                            <h3>
                                Actividades
                            </h3>

                            <p>
                                Revisa las actividades pendientes
                                y realizadas.
                            </p>

                            <button className="btn-curso">
                                Ver actividades
                            </button>

                        </article>


                        <article className="curso-card">

                            <div className="curso-icon">
                                📈
                            </div>

                            <h3>
                                Mi progreso
                            </h3>

                            <p>
                                Consulta tu avance dentro de la plataforma.
                            </p>

                            <button className="btn-curso">
                                Ver progreso
                            </button>

                        </article>

                    </div>

                </section>

            </main>


            {/* FOOTER */}
            <footer className="footer">

                <p>
                    © 2026 PILOSOS. Plataforma educativa.
                </p>

            </footer>

        </div>
    );
}

export default MisCursos;