namespace Sistema_de_citas.DTOs
{
    public class UpdateQuotesDTO
    {
        public string title { get; set; }
        public string quote_description { get; set; }
        public DateTime quote_date { get; set; }
        public int serviciosId { get; set; }
    }
}
