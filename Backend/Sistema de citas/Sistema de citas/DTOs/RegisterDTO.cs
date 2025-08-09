using System.ComponentModel.DataAnnotations;

namespace Sistema_de_citas.DTOs
{
    public record RegisterDTO
    {
        [Required, EmailAddress]
        public string email { get; set; } = string.Empty;
        
        [Required]
        public string password { get; set; } = string.Empty;
        
        [Required]
        public string user_name { get; set; } = string.Empty;
        
        public string user_role { get; set; } = "Usuario";
    }
    
}
