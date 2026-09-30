package pilosos.plataforma.modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "docente")
public class Docente {

    @Id
    @Column(name = "id_docente")
    private Integer idDocente;

    @NotBlank(message = "El departamento académico es obligatorio")
    @Size(max = 50, message = "El departamento académico no debe superar los 50 caracteres")
    @Column(name = "departamento_academico", nullable = false, length = 50)
    private String departamentoAcademico;

    @NotBlank(message = "La asignatura académica es obligatoria")
    @Size(max = 50, message = "La asignatura académica no debe superar los 50 caracteres")
    @Column(name = "asignatura_academica", nullable = false, length = 50)
    private String asignaturaAcademica;

    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne
    @JoinColumn(name = "usuario_id_usuario", nullable = false)
    private Usuario usuario;

    // Constructor vacío obligatorio para JPA
    public Docente() {}

    // Constructor con parámetros
    public Docente(Integer idDocente, String departamentoAcademico,
                   String asignaturaAcademica, Usuario usuario) {
        this.idDocente = idDocente;
        this.departamentoAcademico = departamentoAcademico;
        this.asignaturaAcademica = asignaturaAcademica;
        this.usuario = usuario;
    }

    // Getters y Setters

    public Integer getIdDocente() {
        return idDocente;
    }

    public void setIdDocente(Integer idDocente) {
        this.idDocente = idDocente;
    }

    public String getDepartamentoAcademico() {
        return departamentoAcademico;
    }

    public void setDepartamentoAcademico(String departamentoAcademico) {
        this.departamentoAcademico = departamentoAcademico;
    }

    public String getAsignaturaAcademica() {
        return asignaturaAcademica;
    }

    public void setAsignaturaAcademica(String asignaturaAcademica) {
        this.asignaturaAcademica = asignaturaAcademica;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}