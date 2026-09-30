package pilosos.plataforma.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pilosos.plataforma.modelo.Docente;

@Repository
public interface IDocenteRepositorio extends JpaRepository<Docente, Integer> {
    // Aquí puedes agregar consultas personalizadas si lo necesitas
}