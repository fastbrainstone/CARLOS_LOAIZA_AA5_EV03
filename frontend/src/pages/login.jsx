import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rocket } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import "./login.css";

function Login() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const manejarLogin = async (e) => {
        e.preventDefault();

        // Validar campos
        if (!usuario || !password) {

            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor, ingresa tu correo y contraseña.",
                confirmButtonText: "Aceptar"
            });

            return;
        }

        try {

            // Enviar datos al servicio de autenticación
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    correoUsuario: usuario,
                    contrasenaUsuario: password
                }
            );

            console.log("Respuesta del servidor:", response.data);

            // Guardar los datos del usuario autenticado
            localStorage.setItem(
                "usuario",
                JSON.stringify(response.data)
            );

            // Mostrar mensaje de autenticación exitosa
            await Swal.fire({
                icon: "success",
                title: "Autenticación satisfactoria",
                text: `Hola ${response.data.nombreUsuario}, has iniciado sesión correctamente.`,
                confirmButtonText: "Continuar"
            });

            // Ir al módulo del usuario
            navigate("/mis-cursos");

        } catch (error) {

            console.error("Error en el inicio de sesión:", error);

            // Error de autenticación
            if (
                error.response &&
                error.response.status === 401
            ) {

                Swal.fire({
                    icon: "error",
                    title: "Error de autenticación",
                    text: "Correo o contraseña incorrectos.",
                    confirmButtonText: "Aceptar"
                });

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No fue posible conectar con el servidor.",
                    confirmButtonText: "Aceptar"
                });
            }
        }
    };

    return (
        <div className="login-page">

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

                        <Link to="/cursos">
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

                    <Link to="/registro" className="btn-primary">
                        Crear cuenta
                    </Link>

                </div>

            </nav>


            {/* CONTENIDO DEL LOGIN */}
            <main className="login-container">

                <section className="login-hero">

                    <div className="hero-box">

                        <Rocket
                            size={55}
                            className="login-icon"
                        />

                        <h1>
                            Bienvenido a PILOSOS
                        </h1>

                        <p>
                            Ingresa a tu cuenta y continúa
                            aprendiendo con nosotros.
                        </p>

                    </div>

                </section>


                <section className="login-form-section">

                    <div className="login-form">

                        <h3>
                            Iniciar sesión
                        </h3>

                        <p className="login-description">
                            Ingresa tus datos para acceder
                            a la plataforma.
                        </p>


                        <form onSubmit={manejarLogin}>

                            {/* CORREO */}
                            <div className="input-group">

                                <label htmlFor="usuario">
                                    Correo electrónico
                                </label>

                                <input
                                    id="usuario"
                                    type="email"
                                    placeholder="Ingresa tu correo"
                                    value={usuario}
                                    onChange={(e) =>
                                        setUsuario(e.target.value)
                                    }
                                />

                            </div>


                            {/* CONTRASEÑA */}
                            <div className="input-group">

                                <label htmlFor="password">
                                    Contraseña
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                            </div>


                            <div className="forgot-link">

                                <a href="#">
                                    ¿Olvidaste tu contraseña?
                                </a>

                            </div>


                            <button
                                type="submit"
                                className="btn-submit"
                            >
                                Iniciar sesión
                            </button>

                        </form>


                        <p className="login-text">
                            ¿No tienes una cuenta?{" "}

                            <Link to="/registro">
                                Regístrate aquí
                            </Link>
                        </p>

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

export default Login;