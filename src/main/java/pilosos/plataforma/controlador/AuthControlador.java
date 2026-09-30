package pilosos.plataforma.controlador;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pilosos.plataforma.modelo.Usuario;
import pilosos.plataforma.repositorio.IUsuarioRepositorio;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthControlador {

    @Autowired
    private IUsuarioRepositorio usuarioRepositorio;

    // =========================================================
    // REGISTRO DE USUARIO
    // =========================================================
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {

        System.out.println("Solicitud de registro recibida.");
        System.out.println("Correo recibido: " + usuario.getCorreoUsuario());

        // Verificar si el correo ya está registrado
        Optional<Usuario> usuarioExistente =
                usuarioRepositorio.findByCorreoUsuario(usuario.getCorreoUsuario());

        if (usuarioExistente.isPresent()) {

            System.out.println("El correo ya está registrado.");

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of(
                            "mensaje", "El correo electrónico ya está registrado"
                    ));
        }

        // Guardar el nuevo usuario en la base de datos
        Usuario usuarioGuardado = usuarioRepositorio.save(usuario);

        System.out.println("Usuario registrado correctamente.");
        System.out.println("ID generado: " + usuarioGuardado.getIdUsuario());

        // No enviar la contraseña en la respuesta
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "mensaje", "Usuario registrado correctamente",
                        "idUsuario", usuarioGuardado.getIdUsuario(),
                        "nombreUsuario", usuarioGuardado.getNombreUsuario(),
                        "apellidoUsuario", usuarioGuardado.getApellidoUsuario(),
                        "correoUsuario", usuarioGuardado.getCorreoUsuario()
                ));
    }

    // =========================================================
    // INICIO DE SESIÓN
    // =========================================================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        System.out.println("Solicitud de inicio de sesión recibida.");
        System.out.println("Correo recibido: " + request.getCorreoUsuario());

        // Buscar el usuario por correo electrónico
        Optional<Usuario> usuarioEncontrado =
                usuarioRepositorio.findByCorreoUsuario(request.getCorreoUsuario());

        // Verificar si el correo existe
        if (usuarioEncontrado.isEmpty()) {

            System.out.println("No se encontró el correo.");

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "mensaje", "Correo o contraseña incorrectos"
                    ));
        }

        Usuario usuario = usuarioEncontrado.get();

        System.out.println("Usuario encontrado: "
                + usuario.getNombreUsuario());

        // Verificar que la contraseña almacenada no sea nula
        // y compararla con la contraseña recibida
        if (usuario.getContrasenaUsuario() == null ||
                !usuario.getContrasenaUsuario()
                        .equals(request.getContrasenaUsuario())) {

            System.out.println("La contraseña no coincide.");

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "mensaje", "Correo o contraseña incorrectos"
                    ));
        }

        System.out.println("Inicio de sesión correcto.");

        // No enviar la contraseña a React
        return ResponseEntity.ok(
                Map.of(
                        "mensaje", "Autenticación satisfactoria",
                        "idUsuario", usuario.getIdUsuario(),
                        "nombreUsuario", usuario.getNombreUsuario(),
                        "apellidoUsuario", usuario.getApellidoUsuario(),
                        "correoUsuario", usuario.getCorreoUsuario()
                )
        );
    }

    // =========================================================
    // CLASE PARA RECIBIR LOS DATOS DEL LOGIN
    // =========================================================
    public static class LoginRequest {

        private String correoUsuario;
        private String contrasenaUsuario;

        public String getCorreoUsuario() {
            return correoUsuario;
        }

        public void setCorreoUsuario(String correoUsuario) {
            this.correoUsuario = correoUsuario;
        }

        public String getContrasenaUsuario() {
            return contrasenaUsuario;
        }

        public void setContrasenaUsuario(String contrasenaUsuario) {
            this.contrasenaUsuario = contrasenaUsuario;
        }
    }
}