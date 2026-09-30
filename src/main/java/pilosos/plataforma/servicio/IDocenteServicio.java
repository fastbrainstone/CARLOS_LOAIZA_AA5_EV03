package pilosos.plataforma.servicio;

import java.util.List;
import pilosos.plataforma.modelo.Docente;

public interface IDocenteServicio {

    List<Docente> listarDocentes();

    void guardarDocente(Docente docente);

    Docente buscarPorId(Integer id);

    void eliminarDocente(Integer id);

    void actualizarDocente(Docente docente);
}