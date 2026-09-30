package pilosos.plataforma.controlador;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import pilosos.plataforma.modelo.Usuario;
import pilosos.plataforma.servicio.IUsuarioServicio;

@Controller
@RequestMapping("/usuarios")
public class UsuarioControlador {

    @Autowired
    private IUsuarioServicio service;

    // Página principal
    @GetMapping
    public String inicio() {
        return "index";
    }

    // Vista para registrar usuario
    @GetMapping("/registrar")
    public String vistaRegistrar(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "usuario-registrar";
    }

    // Vista para consultar lista de usuarios
    @GetMapping("/consultar")
    public String vistaConsultar(Model model) {
        model.addAttribute("usuarios", service.listarUsuarios());
        return "usuario-consultar";
    }

    // Vista para consultar usuario por ID
    @GetMapping("/consultar-id")
    public String vistaConsultarPorId() {
        return "usuario-consultar-id";
    }

    // Buscar usuario por ID
    @GetMapping("/consultar-id/buscar")
    public String consultarPorId(
            @RequestParam("id") Integer id,
            Model model) {

        Usuario usuario = service.buscarPorId(id);

        if (usuario == null) {
            model.addAttribute(
                    "mensaje",
                    "No se encontró un usuario con la identificación indicada."
            );
        } else {
            model.addAttribute("usuario", usuario);
        }

        return "usuario-consultar-id";
    }

    // Guardar usuario
    @PostMapping("/guardar")
    public String guardar(
            @Valid @ModelAttribute("usuario") Usuario usuario,
            BindingResult result,
            Model model) {

        if (result.hasErrors()) {
            return "usuario-registrar";
        }

        service.guardarUsuario(usuario);

        return "redirect:/usuarios/consultar";
    }

    // Actualizar usuario
    @PostMapping("/actualizar")
    public String actualizar(
            @Valid @ModelAttribute("usuario") Usuario usuario,
            BindingResult result,
            Model model) {

        if (result.hasErrors()) {
            return "usuario-actualizar";
        }

        service.actualizarUsuario(usuario);

        return "redirect:/usuarios/consultar";
    }

    // Vista para editar usuario
    @GetMapping("/editar/{id}")
    public String vistaEditar(
            @PathVariable("id") Integer id,
            Model model) {

        model.addAttribute("usuario", service.buscarPorId(id));

        return "usuario-actualizar";
    }

    // Vista para eliminar usuario
    @GetMapping("/eliminar")
    public String vistaEliminar() {
        return "usuario-eliminar-id";
    }

    // Buscar usuario por ID antes de eliminar
    @PostMapping("/eliminar/buscar")
    public String buscarParaEliminar(
            @RequestParam("idUsuario") Integer id,
            Model model) {

        Usuario usuario = service.buscarPorId(id);

        if (usuario == null) {
            model.addAttribute(
                    "mensaje",
                    "No existe un usuario con el ID ingresado."
            );

            return "usuario-eliminar-id";
        }

        model.addAttribute("usuario", usuario);

        return "usuario-eliminar";
    }

    // Confirmar y ejecutar la eliminación
    @PostMapping("/eliminar/confirmar")
    public String confirmarEliminar(
            @RequestParam("idUsuario") Integer id,
            Model model) {

        try {
            service.eliminarUsuario(id);

            return "redirect:/usuarios/consultar";

        } catch (Exception e) {

            Usuario usuario = service.buscarPorId(id);

            model.addAttribute("usuario", usuario);

            model.addAttribute(
                    "mensaje",
                    "No se puede eliminar este usuario porque tiene registros relacionados."
            );

            return "usuario-eliminar";
        }
    }
}