using System.ComponentModel.DataAnnotations;

namespace Sistema_de_citas.Model
{
    public class Quotes
    {
        [Key]
        public int Id { get; set; }
        public string title { get; set; } 
        public string quote_description { get; set; }
        public DateTime quote_date { get; set; }
        public string quote_state { get; set; }
        public int UsersId { get; set; }
        public int ServiciosId { get; set; }
        public Users Users { get; set; }
        public Servicios Servicios { get; set; }
    }
}
