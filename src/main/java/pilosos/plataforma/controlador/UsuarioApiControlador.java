package pilosos.plataforma.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pilosos.plataforma.modelo.Usuario;
import pilosos.plataforma.servicio.IUsuarioServicio;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioApiControlador {

    @Autowired
    private IUsuarioServicio service;

    // Consultar todos los usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {

        List<Usuario> usuarios = service.listarUsuarios();

        return ResponseEntity.ok(usuarios);
    }

    // Consultar un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(
            @PathVariable Integer id) {

        Usuario usuario = service.buscarPorId(id);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(usuario);
    }

    // Registrar usuario
    @PostMapping
    public ResponseEntity<Usuario> guardarUsuario(
            @RequestBody Usuario usuario) {

        service.guardarUsuario(usuario);

        return ResponseEntity.ok(usuario);
    }

    // Actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(
            @PathVariable Integer id,
            @RequestBody Usuario usuario) {

        Usuario usuarioExistente = service.buscarPorId(id);

        if (usuarioExistente == null) {
            return ResponseEntity.notFound().build();
        }

        usuario.setIdUsuario(id);

        service.actualizarUsuario(usuario);

        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(
            @PathVariable Integer id) {

        Usuario usuario = service.buscarPorId(id);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        service.eliminarUsuario(id);

        return ResponseEntity.ok(
                "Usuario eliminado correctamente"
        );
    }
}