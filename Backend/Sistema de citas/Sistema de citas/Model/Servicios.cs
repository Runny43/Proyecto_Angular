using System.ComponentModel.DataAnnotations;

namespace Sistema_de_citas.Model
{
    public class Servicios
    {
        public int Id { get; set; }
        public string service_names { get; set; }
        public string service_description { get; set; }
        public string duration { get; set; }
        public float price { get; set; }
    }
}
