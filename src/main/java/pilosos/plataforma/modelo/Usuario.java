package pilosos.plataforma.modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @NotBlank(message = "El tipo de identificación es obligatorio")
    @Size(max = 15, message = "El tipo de identificación no debe superar los 15 caracteres")
    @Column(name = "tipo_id", nullable = false, length = 15)
    private String tipoId;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 30, message = "El nombre no debe superar los 30 caracteres")
    @Column(name = "nombre_usuario", nullable = false, length = 30)
    private String nombreUsuario;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 30, message = "El apellido no debe superar los 30 caracteres")
    @Column(name = "apellido_usuario", nullable = false, length = 30)
    private String apellidoUsuario;

    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "Debe ingresar un formato de correo válido")
    @Size(max = 255, message = "El correo no debe superar los 255 caracteres")
    @Column(name = "correo_usuario", nullable = false, unique = true, length = 255)
    private String correoUsuario;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, max = 100, message = "La contraseña debe tener entre 6 y 100 caracteres")
    @Column(name = "contrasena_usuario", nullable = false, length = 100)
    private String contrasenaUsuario;

    // Constructor vacío obligatorio para JPA
    public Usuario() {
    }

    // Constructor con parámetros
    public Usuario(
            Integer idUsuario,
            String tipoId,
            String nombreUsuario,
            String apellidoUsuario,
            String correoUsuario,
            String contrasenaUsuario) {

        this.idUsuario = idUsuario;
        this.tipoId = tipoId;
        this.nombreUsuario = nombreUsuario;
        this.apellidoUsuario = apellidoUsuario;
        this.correoUsuario = correoUsuario;
        this.contrasenaUsuario = contrasenaUsuario;
    }

    // Getters y Setters

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getTipoId() {
        return tipoId;
    }

    public void setTipoId(String tipoId) {
        this.tipoId = tipoId;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getApellidoUsuario() {
        return apellidoUsuario;
    }

    public void setApellidoUsuario(String apellidoUsuario) {
        this.apellidoUsuario = apellidoUsuario;
    }

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