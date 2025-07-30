using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_de_citas.DatabaseHelper;
using Sistema_de_citas.Model;
using System.Threading;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Sistema_de_citas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)

        {

            _context = context;

        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<List<Users>> Get()
        {
            List<Users> usersList = new List<Users>();
            usersList = await _context.Users.ToListAsync();
            return usersList;
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public IQueryable<Users> Get(int id)
        {
            var userLista = from x in _context.Users where x.Id == id select x;
            return userLista;
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post([FromBody] Users user)
        {
            user.Id = 0; //Id en 0 ya que la base de datos la ingresa de manera auto incrementable
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok();
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var userLista = from x in _context.Users where x.Id == id select x;

            var value = userLista.ExecuteDelete();
        }
    }
}
