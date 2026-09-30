package pilosos.plataforma.controlador;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import pilosos.plataforma.modelo.Docente;
import pilosos.plataforma.servicio.IDocenteServicio;
import pilosos.plataforma.servicio.IUsuarioServicio;

@Controller
@RequestMapping("/docentes")
public class DocenteControlador {

    @Autowired
    private IDocenteServicio service;

    @Autowired
    private IUsuarioServicio usuarioService;

    // Página principal
    @GetMapping
    public String inicio() {
        return "index";
    }

    // Vista para registrar docente
    @GetMapping("/registrar")
    public String vistaRegistrar(Model model) {
        model.addAttribute("docente", new Docente());
        model.addAttribute("usuarios", usuarioService.listarUsuarios());

        return "docente-registrar";
    }

    // Vista para consultar lista de docentes
    @GetMapping("/consultar")
    public String vistaConsultar(Model model) {
        model.addAttribute("docentes", service.listarDocentes());

        return "docente-consultar";
    }

    // Vista para consultar docente por ID
    @GetMapping("/consultar-id")
    public String vistaConsultarPorId() {
        return "docente-consultar-id";
    }

    // Buscar docente por ID
    @GetMapping("/consultar-id/buscar")
    public String consultarPorId(
            @RequestParam("id") Integer id,
            Model model) {

        Docente docente = service.buscarPorId(id);

        if (docente == null) {
            model.addAttribute(
                    "mensaje",
                    "No se encontró un docente con la identificación indicada."
            );
        } else {
            model.addAttribute("docente", docente);
        }

        return "docente-consultar-id";
    }

    // Guardar docente
    @PostMapping("/guardar")
    public String guardar(
            @Valid @ModelAttribute("docente") Docente docente,
            BindingResult result,
            Model model) {

        if (result.hasErrors()) {
            model.addAttribute("usuarios", usuarioService.listarUsuarios());
            return "docente-registrar";
        }

        try {
            service.guardarDocente(docente);
        } catch (IllegalArgumentException e) {
            model.addAttribute("error", e.getMessage());
            model.addAttribute("usuarios", usuarioService.listarUsuarios());

            return "docente-registrar";
        }

        return "redirect:/docentes/consultar";
    }

    // Actualizar docente
    @PostMapping("/actualizar")
    public String actualizar(
            @Valid @ModelAttribute("docente") Docente docente,
            BindingResult result,
            Model model) {

        if (result.hasErrors()) {
            model.addAttribute("usuarios", usuarioService.listarUsuarios());
            return "docente-actualizar";
        }

        service.actualizarDocente(docente);

        return "redirect:/docentes/consultar";
    }

    // Vista para editar docente
    @GetMapping("/editar/{id}")
    public String vistaEditar(
            @PathVariable("id") Integer id,
            Model model) {

        model.addAttribute("docente", service.buscarPorId(id));
        model.addAttribute("usuarios", usuarioService.listarUsuarios());

        return "docente-actualizar";
    }

    // Vista para eliminar docente
    @GetMapping("/eliminar")
    public String vistaEliminar() {
        return "docente-eliminar-id";
    }

    // Buscar docente por ID antes de eliminar
    @PostMapping("/eliminar/buscar")
    public String buscarParaEliminar(
            @RequestParam("idDocente") Integer id,
            Model model) {

        Docente docente = service.buscarPorId(id);

        if (docente == null) {
            model.addAttribute(
                    "mensaje",
                    "No existe un docente con el ID ingresado."
            );

            return "docente-eliminar-id";
        }

        model.addAttribute("docente", docente);

        return "docente-eliminar";
    }

    // Confirmar y ejecutar eliminación
    @PostMapping("/eliminar/confirmar")
    public String confirmarEliminar(
            @RequestParam("idDocente") Integer id,
            Model model) {

        try {
            service.eliminarDocente(id);

            return "redirect:/docentes/consultar";

        } catch (Exception e) {

            Docente docente = service.buscarPorId(id);

            model.addAttribute("docente", docente);

            model.addAttribute(
                    "mensaje",
                    "No se puede eliminar este docente porque tiene registros relacionados."
            );

            return "docente-eliminar";
        }
    }
}