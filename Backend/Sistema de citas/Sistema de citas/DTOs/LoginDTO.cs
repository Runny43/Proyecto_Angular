using System.ComponentModel.DataAnnotations;

namespace Sistema_de_citas.DTOs
{
    public record LoginDTO(
           [Required, EmailAddress] string email,
           [Required]  string password
        );
    
}
