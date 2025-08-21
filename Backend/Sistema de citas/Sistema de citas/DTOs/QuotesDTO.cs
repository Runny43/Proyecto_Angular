namespace Sistema_de_citas.DTOs
{
    public class QuotesDTO
    {
        public int Id { get; set; }
        public string title { get; set; } 
        public string quote_description { get; set; }
        public DateTime quote_date { get; set; }

        public string quote_state { get; set; } = "Pendiente";
        public int usersId { get; set; }
        public int serviciosId { get; set; }
    }
}
