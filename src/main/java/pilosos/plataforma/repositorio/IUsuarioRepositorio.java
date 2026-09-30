package pilosos.plataforma.repositorio;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pilosos.plataforma.modelo.Usuario;

public interface IUsuarioRepositorio extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByCorreoUsuario(String correoUsuario);
}