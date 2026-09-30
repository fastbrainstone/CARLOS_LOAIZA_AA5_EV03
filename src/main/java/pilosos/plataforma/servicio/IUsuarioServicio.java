package pilosos.plataforma.servicio;

import java.util.List;
import pilosos.plataforma.modelo.Usuario;

public interface IUsuarioServicio {

    List<Usuario> listarUsuarios();

    void guardarUsuario(Usuario usuario);

    Usuario buscarPorId(Integer id);

    void eliminarUsuario(Integer id);

    void actualizarUsuario(Usuario usuario);
}
