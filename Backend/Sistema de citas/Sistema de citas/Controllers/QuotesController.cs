using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_de_citas.DatabaseHelper;
using Sistema_de_citas.Model;

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
            List<Quotes> quoteList = new List<Quotes>();
            quoteList = await _context.Quotes.ToListAsync();
            return quoteList;
        }

        // GET api/<QuotesController>/5
        [HttpGet("{id}")]
        public IQueryable Get(int id)
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
}
