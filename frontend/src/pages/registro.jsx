import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./registro.css";

function Registro() {

    const navigate = useNavigate();

    const [tipoId, setTipoId] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [apellidoUsuario, setApellidoUsuario] = useState("");
    const [correoUsuario, setCorreoUsuario] = useState("");
    const [contrasenaUsuario, setContrasenaUsuario] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    const manejarRegistro = async (e) => {
        e.preventDefault();

        if (
            !tipoId ||
            !nombreUsuario ||
            !apellidoUsuario ||
            !correoUsuario ||
            !contrasenaUsuario ||
            !confirmarContrasena
        ) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor, completa todos los campos."
            });

            return;
        }

        if (contrasenaUsuario !== confirmarContrasena) {
            Swal.fire({
                icon: "error",
                title: "Contraseñas diferentes",
                text: "Las contraseñas no coinciden."
            });

            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:8080/api/auth/registro",
                {
                    tipoId: tipoId,
                    nombreUsuario: nombreUsuario,
                    apellidoUsuario: apellidoUsuario,
                    correoUsuario: correoUsuario,
                    contrasenaUsuario: contrasenaUsuario
                }
            );

            console.log("Registro exitoso:", response.data);

            await Swal.fire({
                icon: "success",
                title: "Registro exitoso",
                text: "El usuario fue registrado correctamente.",
                confirmButtonText: "Continuar"
            });

            setTipoId("");
            setNombreUsuario("");
            setApellidoUsuario("");
            setCorreoUsuario("");
            setContrasenaUsuario("");
            setConfirmarContrasena("");

            navigate("/login");

        } catch (error) {

            console.error("Error en el registro:", error);

            if (error.response && error.response.status === 409) {

                Swal.fire({
                    icon: "warning",
                    title: "Correo ya registrado",
                    text: "El correo electrónico ya se encuentra registrado."
                });

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No fue posible registrar el usuario. Verifica que el servidor esté funcionando."
                });
            }
        }
    };

    return (
        <div className="registro-page">

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

                    <Link to="/login" className="login-link">
                        Iniciar sesión
                    </Link>

                </div>

            </nav>


            {/* CONTENIDO */}
            <main className="registro-container">

                <section className="registro-card">

                    <div className="registro-header">

                        <div className="registro-icon">
                            🚀
                        </div>

                        <h1>
                            Crear cuenta
                        </h1>

                        <p className="registro-description">
                            Regístrate en PILOSOS y comienza a disfrutar
                            de nuestra plataforma educativa.
                        </p>

                    </div>


                    <form
                        className="registro-form"
                        onSubmit={manejarRegistro}
                    >

                        <div className="input-group">

                            <label>
                                Tipo de identificación
                            </label>

                            <select
                                value={tipoId}
                                onChange={(e) => setTipoId(e.target.value)}
                            >

                                <option value="">
                                    Selecciona una opción
                                </option>

                                <option value="CC">
                                    Cédula de ciudadanía
                                </option>

                                <option value="TI">
                                    Tarjeta de identidad
                                </option>

                                <option value="CE">
                                    Cédula de extranjería
                                </option>

                            </select>

                        </div>


                        <div className="input-group">

                            <label>
                                Nombre
                            </label>

                            <input
                                type="text"
                                placeholder="Ingresa tu nombre"
                                value={nombreUsuario}
                                onChange={(e) =>
                                    setNombreUsuario(e.target.value)
                                }
                            />

                        </div>


                        <div className="input-group">

                            <label>
                                Apellido
                            </label>

                            <input
                                type="text"
                                placeholder="Ingresa tu apellido"
                                value={apellidoUsuario}
                                onChange={(e) =>
                                    setApellidoUsuario(e.target.value)
                                }
                            />

                        </div>


                        <div className="input-group">

                            <label>
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={correoUsuario}
                                onChange={(e) =>
                                    setCorreoUsuario(e.target.value)
                                }
                            />

                        </div>


                        <div className="input-group">

                            <label>
                                Contraseña
                            </label>

                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={contrasenaUsuario}
                                onChange={(e) =>
                                    setContrasenaUsuario(e.target.value)
                                }
                            />

                        </div>


                        <div className="input-group">

                            <label>
                                Confirmar contraseña
                            </label>

                            <input
                                type="password"
                                placeholder="Repite tu contraseña"
                                value={confirmarContrasena}
                                onChange={(e) =>
                                    setConfirmarContrasena(e.target.value)
                                }
                            />

                        </div>


                        <button
                            type="submit"
                            className="btn-registro"
                        >
                            Crear cuenta
                        </button>

                    </form>


                    <p className="login-text">

                        ¿Ya tienes una cuenta?{" "}

                        <Link to="/login">
                            Inicia sesión
                        </Link>

                    </p>

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

export default Registro;