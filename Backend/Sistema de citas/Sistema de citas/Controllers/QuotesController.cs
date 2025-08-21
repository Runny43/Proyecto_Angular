using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_de_citas.DatabaseHelper;
using Sistema_de_citas.Model;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Sistema_de_citas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QuotesController(AppDbContext context)

        {

            _context = context;

        }

        // GET: api/<QuotesController>
        [HttpGet]
        public async Task<List<Quotes>> Get()
        {
            return await _context.Quotes.ToListAsync();
        }

        // GET api/<QuotesController>/5
        [HttpGet("{id}")]
        public IQueryable<Quotes> Get(int id)
        {
            var quotesLista = from x in _context.Quotes where x.Id == id select x;
            return quotesLista;
        }

        
        // POST api/<QuotesController>
        [HttpPost]
        public IActionResult Post([FromBody] Quotes quotes)
        {
            quotes.Id = 0;
            _context.Quotes.Add(quotes);
            _context.SaveChanges();
            return Ok();
        }

        // PUT api/<QuotesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Quotes quotes)
        {
        }

        // DELETE api/<QuotesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var resultado = from x in _context.Quotes where x.Id == id select x;

            var eliminacion = resultado.ExecuteDelete();
        }
    }

    internal record struct NewStruct(string title, string quote_description, DateTime quote_date, int UsersId, string user_name)
    {
        public static implicit operator (string title, string quote_description, DateTime quote_date, int UsersId, string user_name)(NewStruct value)
        {
            return (value.title, value.quote_description, value.quote_date, value.UsersId, value.user_name);
        }

        public static implicit operator NewStruct((string title, string quote_description, DateTime quote_date, int UsersId, string user_name) value)
        {
            return new NewStruct(value.title, value.quote_description, value.quote_date, value.UsersId, value.user_name);
        }
    }
}
