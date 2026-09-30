package pilosos.plataforma.servicio;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pilosos.plataforma.modelo.Docente;
import pilosos.plataforma.repositorio.IDocenteRepositorio;

@Service
public class DocenteServicioImpl implements IDocenteServicio {

    @Autowired
    private IDocenteRepositorio repository;

    @Override
    public List<Docente> listarDocentes() {
        return repository.findAll();
    }

    @Override
    public void guardarDocente(Docente docente) {

        // Verificar si ya existe un docente con esa identificación
        if (repository.existsById(docente.getIdDocente())) {

            throw new IllegalArgumentException(
                    "Ya existe un docente registrado con la identificación: "
                    + docente.getIdDocente()
            );
        }

        // Si no existe, se registra como nuevo docente
        repository.save(docente);
    }

    @Override
    public Docente buscarPorId(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void actualizarDocente(Docente docente) {
        Docente docenteExistente = repository.findById(docente.getIdDocente())
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

        docenteExistente.setDepartamentoAcademico(
                docente.getDepartamentoAcademico()
        );

        docenteExistente.setAsignaturaAcademica(
                docente.getAsignaturaAcademica()
        );

        docenteExistente.setUsuario(
                docente.getUsuario()
        );

        repository.save(docenteExistente);
    }

    @Override
    public void eliminarDocente(Integer id) {
        repository.deleteById(id);
    }
}