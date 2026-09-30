package pilosos.plataforma.servicio;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pilosos.plataforma.modelo.Usuario;
import pilosos.plataforma.repositorio.IUsuarioRepositorio;

@Service
public class UsuarioServicioImpl implements IUsuarioServicio {

    @Autowired
    private IUsuarioRepositorio repository;

    @Override
    public List<Usuario> listarUsuarios() {
        return repository.findAll();
    }

    @Override
    public void guardarUsuario(Usuario usuario) {
        repository.save(usuario);
    }

    @Override
    public Usuario buscarPorId(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void actualizarUsuario(Usuario usuario) {
        Usuario usuarioExistente = repository.findById(usuario.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuarioExistente.setTipoId(usuario.getTipoId());
        usuarioExistente.setNombreUsuario(usuario.getNombreUsuario());
        usuarioExistente.setApellidoUsuario(usuario.getApellidoUsuario());
        usuarioExistente.setCorreoUsuario(usuario.getCorreoUsuario());

        repository.save(usuarioExistente);
    }

    @Override
    public void eliminarUsuario(Integer id) {
        repository.deleteById(id);
    }
}