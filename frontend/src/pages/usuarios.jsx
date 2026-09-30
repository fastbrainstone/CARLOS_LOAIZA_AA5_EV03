import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./usuarios.css";

function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Estado para editar
    const [modoEdicion, setModoEdicion] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    // =====================================================
    // CONSULTAR USUARIOS
    // =====================================================

    const cargarUsuarios = async () => {

        try {

            setCargando(true);

            const response = await axios.get(
                "http://localhost:8080/api/usuarios"
            );

            setUsuarios(response.data);

        } catch (error) {

            console.error(
                "Error al consultar usuarios:",
                error
            );

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No fue posible consultar los usuarios.",
                confirmButtonText: "Aceptar"
            });

        } finally {

            setCargando(false);

        }
    };

    // Cargar usuarios al abrir la página
    useEffect(() => {

        cargarUsuarios();

    }, []);


    // =====================================================
    // EDITAR USUARIO
    // =====================================================

    const editarUsuario = (usuario) => {

        setUsuarioEditando({
            idUsuario: usuario.idUsuario,
            tipoId: usuario.tipoId || "",
            nombreUsuario: usuario.nombreUsuario || "",
            apellidoUsuario: usuario.apellidoUsuario || "",
            correoUsuario: usuario.correoUsuario || ""
        });

        setModoEdicion(true);
    };


    // =====================================================
    // CAMBIAR DATOS DEL FORMULARIO
    // =====================================================

    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setUsuarioEditando({
            ...usuarioEditando,
            [name]: value
        });
    };


    // =====================================================
    // GUARDAR CAMBIOS
    // =====================================================

    const guardarCambios = async (e) => {

        e.preventDefault();

        if (
            !usuarioEditando.tipoId ||
            !usuarioEditando.nombreUsuario ||
            !usuarioEditando.apellidoUsuario ||
            !usuarioEditando.correoUsuario
        ) {

            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Completa todos los campos.",
                confirmButtonText: "Aceptar"
            });

            return;
        }

        try {

            await axios.put(
                `http://localhost:8080/api/usuarios/${usuarioEditando.idUsuario}`,
                usuarioEditando
            );

            await Swal.fire({
                icon: "success",
                title: "Usuario actualizado",
                text: "Los datos se actualizaron correctamente.",
                confirmButtonText: "Aceptar"
            });

            setModoEdicion(false);
            setUsuarioEditando(null);

            await cargarUsuarios();

        } catch (error) {

            console.error(
                "Error al actualizar usuario:",
                error
            );

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No fue posible actualizar el usuario.",
                confirmButtonText: "Aceptar"
            });
        }
    };


    // =====================================================
    // CANCELAR EDICIÓN
    // =====================================================

    const cancelarEdicion = () => {

        setModoEdicion(false);
        setUsuarioEditando(null);

    };


    // =====================================================
    // ELIMINAR USUARIO
    // =====================================================

    const eliminarUsuario = async (usuario) => {

        const resultado = await Swal.fire({

            icon: "warning",

            title: "¿Eliminar usuario?",

            text:
                `¿Deseas eliminar a ${usuario.nombreUsuario} ` +
                `${usuario.apellidoUsuario}?`,

            showCancelButton: true,

            confirmButtonText: "Sí, eliminar",

            cancelButtonText: "Cancelar",

            confirmButtonColor: "#dc2626"

        });

        if (!resultado.isConfirmed) {

            return;

        }

        try {

            await axios.delete(
                `http://localhost:8080/api/usuarios/${usuario.idUsuario}`
            );

            await Swal.fire({

                icon: "success",

                title: "Usuario eliminado",

                text:
                    "El usuario fue eliminado correctamente.",

                confirmButtonText: "Aceptar"

            });

            await cargarUsuarios();

        } catch (error) {

            console.error(
                "Error al eliminar usuario:",
                error
            );

            Swal.fire({

                icon: "error",

                title: "No se pudo eliminar",

                text:
                    "El usuario puede tener registros relacionados " +
                    "en el sistema.",

                confirmButtonText: "Aceptar"

            });
        }
    };


    // =====================================================
    // INTERFAZ
    // =====================================================

    return (

        <div className="usuarios-page">

            {/* =================================================
                NAVBAR
            ================================================= */}

            <nav className="navbar">

                <div className="nav-left">

                    <Link
                        to="/"
                        className="logo"
                    >
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

                    <Link
                        to="/mis-cursos"
                        className="btn-volver"
                    >
                        Volver
                    </Link>

                </div>

            </nav>


            {/* =================================================
                CONTENIDO
            ================================================= */}

            <main className="usuarios-container">

                <div className="usuarios-header">

                    <div>

                        <h1>
                            Gestión de usuarios
                        </h1>

                        <p>
                            Consulta y administra los usuarios
                            registrados en PILOSOS.
                        </p>

                    </div>

                    <button
                        className="btn-recargar"
                        onClick={cargarUsuarios}
                    >
                        🔄 Actualizar
                    </button>

                </div>


                {/* =================================================
                    FORMULARIO DE EDICIÓN
                ================================================= */}

                {modoEdicion && usuarioEditando && (

                    <section className="editar-panel">

                        <h2>
                            Editar usuario
                        </h2>

                        <p>
                            Modifica los datos del usuario seleccionado.
                        </p>

                        <form
                            className="editar-form"
                            onSubmit={guardarCambios}
                        >

                            <div className="campo">

                                <label htmlFor="tipoId">
                                    Tipo de identificación
                                </label>

                                <input
                                    id="tipoId"
                                    name="tipoId"
                                    type="text"
                                    value={usuarioEditando.tipoId}
                                    onChange={manejarCambio}
                                    maxLength="15"
                                />

                            </div>


                            <div className="campo">

                                <label htmlFor="nombreUsuario">
                                    Nombre
                                </label>

                                <input
                                    id="nombreUsuario"
                                    name="nombreUsuario"
                                    type="text"
                                    value={usuarioEditando.nombreUsuario}
                                    onChange={manejarCambio}
                                    maxLength="30"
                                />

                            </div>


                            <div className="campo">

                                <label htmlFor="apellidoUsuario">
                                    Apellido
                                </label>

                                <input
                                    id="apellidoUsuario"
                                    name="apellidoUsuario"
                                    type="text"
                                    value={usuarioEditando.apellidoUsuario}
                                    onChange={manejarCambio}
                                    maxLength="30"
                                />

                            </div>


                            <div className="campo">

                                <label htmlFor="correoUsuario">
                                    Correo electrónico
                                </label>

                                <input
                                    id="correoUsuario"
                                    name="correoUsuario"
                                    type="email"
                                    value={usuarioEditando.correoUsuario}
                                    onChange={manejarCambio}
                                />

                            </div>


                            <div className="editar-botones">

                                <button
                                    type="submit"
                                    className="btn-guardar"
                                >
                                    💾 Guardar cambios
                                </button>

                                <button
                                    type="button"
                                    className="btn-cancelar"
                                    onClick={cancelarEdicion}
                                >
                                    Cancelar
                                </button>

                            </div>

                        </form>

                    </section>

                )}


                {/* =================================================
                    TABLA
                ================================================= */}

                {cargando ? (

                    <div className="mensaje-cargando">
                        Cargando usuarios...
                    </div>

                ) : usuarios.length === 0 ? (

                    <div className="mensaje-vacio">
                        No hay usuarios registrados.
                    </div>

                ) : (

                    <div className="tabla-container">

                        <table className="usuarios-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Tipo ID
                                    </th>

                                    <th>
                                        Nombre
                                    </th>

                                    <th>
                                        Apellido
                                    </th>

                                    <th>
                                        Correo electrónico
                                    </th>

                                    <th>
                                        Acciones
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {usuarios.map((usuario) => (

                                    <tr
                                        key={usuario.idUsuario}
                                    >

                                        <td>
                                            {usuario.idUsuario}
                                        </td>

                                        <td>
                                            {usuario.tipoId}
                                        </td>

                                        <td>
                                            {usuario.nombreUsuario}
                                        </td>

                                        <td>
                                            {usuario.apellidoUsuario}
                                        </td>

                                        <td>
                                            {usuario.correoUsuario}
                                        </td>

                                        <td>

                                            <button
                                                className="btn-editar"
                                                onClick={() =>
                                                    editarUsuario(usuario)
                                                }
                                            >
                                                ✏️ Editar
                                            </button>

                                            <button
                                                className="btn-eliminar"
                                                onClick={() =>
                                                    eliminarUsuario(usuario)
                                                }
                                            >
                                                🗑️ Eliminar
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </main>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="footer">

                <p>
                    © 2026 PILOSOS. Plataforma educativa.
                </p>

            </footer>

        </div>
    );
}

export default Usuarios;