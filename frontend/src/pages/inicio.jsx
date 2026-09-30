import React from "react";
import { Link } from "react-router-dom";
import { Rocket, BookOpen, Users, GraduationCap } from "lucide-react";
import "./Inicio.css";

function Inicio() {
    return (
        <div className="inicio">

            {/* Barra de navegación */}
            <header className="navbar">
                <Link to="/" className="logo">
                    PILOSOS
                </Link>

                <nav className="nav-links">
                    <div className="dropdown">
                        <span>Explorar ▾</span>

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

                    <Link to="/cursos">Cursos</Link>
                    <Link to="/progreso">Progreso</Link>
                    <Link to="/comunidad">Comunidad</Link>
                </nav>

                <div className="nav-buttons">
                    <Link to="/login" className="login-button">
                        Iniciar Sesión
                    </Link>

                    <a
                        href="http://localhost:8080/usuarios/registrar"
                        className="register-button"
                    >
                        Registrarse
                    </a>
                </div>
            </header>

            {/* Sección principal */}
            <main>

                <section className="hero">

                    <div className="hero-text">

                        <span className="welcome">
                            🚀 ¡Hola, Piloso!
                        </span>

                        <h1>
                            Aprende, descubre y
                            <span> alcanza tus metas</span>
                        </h1>

                        <p>
                            Bienvenido a PILOSOS, una plataforma educativa
                            diseñada para aprender de una manera divertida,
                            interactiva y diferente.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/login" className="main-button">
                                Comenzar a aprender 🚀
                            </Link>

                            <Link to="/quienes-somos" className="secondary-button">
                                Conocer PILOSOS
                            </Link>
                        </div>

                    </div>

                    <div className="hero-image">
                        <div className="planet">
                            <Rocket size={100} strokeWidth={1.5} />
                        </div>
                    </div>

                </section>

                {/* Tarjetas */}
                <section className="features">

                    <h2>
                        Todo lo que necesitas para aprender
                    </h2>

                    <p className="features-text">
                        Explora las herramientas que PILOSOS tiene para ti.
                    </p>

                    <div className="cards">

                        <div className="card">
                            <div className="card-icon">
                                <BookOpen size={40} />
                            </div>

                            <h3>Cursos</h3>

                            <p>
                                Explora tus cursos y aprende nuevos temas
                                de una manera divertida.
                            </p>

                            <Link to="/cursos">
                                Ver cursos →
                            </Link>
                        </div>

                        <div className="card">
                            <div className="card-icon">
                                <GraduationCap size={40} />
                            </div>

                            <h3>Progreso</h3>

                            <p>
                                Consulta tus avances y descubre cuánto
                                has aprendido.
                            </p>

                            <Link to="/progreso">
                                Ver progreso →
                            </Link>
                        </div>

                        <div className="card">
                            <div className="card-icon">
                                <Users size={40} />
                            </div>

                            <h3>Comunidad</h3>

                            <p>
                                Comparte, participa y aprende junto
                                a otros estudiantes.
                            </p>

                            <Link to="/comunidad">
                                Ir a comunidad →
                            </Link>
                        </div>

                    </div>

                </section>

            </main>

            {/* Pie de página */}
            <footer>
                <p>
                    © 2026 PILOSOS - Plataforma Educativa
                </p>
            </footer>

        </div>
    );
}

export default Inicio;