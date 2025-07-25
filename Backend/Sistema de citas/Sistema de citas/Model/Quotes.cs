namespace Sistema_de_citas.Model
{
    public class Quotes
    {
        public int quotes_Id { get; set; }
        public string title { get; set; } 
        public string quote_description { get; set; }
        public DateTime quote_date { get; set; }
        public string quote_state { get; set; }
        public int Usersuser_Id { get; set; }
        public string System_Serviceservice_Id { get; set; }

        public Users Users { get; set; }
        public System_Services System_Services { get; set; }
    }
}
