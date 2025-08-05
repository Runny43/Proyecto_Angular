using System.ComponentModel.DataAnnotations;

namespace Sistema_de_citas.Model
{
    public class Users
    {
        public int Id { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string user_name { get; set; }
        public string user_role { get; set; }
    }
}
