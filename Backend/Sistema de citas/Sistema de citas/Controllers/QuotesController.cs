using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_de_citas.DatabaseHelper;
using Sistema_de_citas.DTOs;
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

        // GET api/<QuotesController>/5
        [HttpGet("{Id}")]
        public IQueryable<Quotes> GetQuotes(int Id)
        {


            //var quotesResult= from x in quotes
            //            join u in userLista on x.UsersId equals u.Id
            //            join s in services on x.ServiciosId equals s.Id
            //            select (x.title, x.quote_description, x.quote_date, s.service_names, u.user_name);
            //return quotesResult;
            var quotesResult = from x in _context.Quotes
                               where x.Id == Id
                               select x;

            return quotesResult;

            //SELECT q.Id, q.title, q.quote_description, q.quote_date, q.quote_state, q.UsersId, u.user_name, u.email FROM Quotes q INNER JOIN Users u ON(q.UsersId = u.Id);
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

        [HttpPost("NewQuoteClient")]

        public async Task<IActionResult> NewQuoteClient(QuotesDTO dto)
        {
            if (string.IsNullOrEmpty(dto.title) || string.IsNullOrEmpty(dto.quote_description) || dto.quote_date == default || string.IsNullOrEmpty(dto.quote_state) || string.IsNullOrEmpty(Convert.ToString(dto.usersId)) || string.IsNullOrEmpty(Convert.ToString(dto.serviciosId)))
            {
                return BadRequest(new { msg = "Todos los campos son obligatorios" });
            }
            var quote = new Quotes
            {
                title = dto.title,
                quote_description = dto.quote_description,
                quote_date = dto.quote_date,
                quote_state = dto.quote_state,
                UsersId = dto.usersId,
                ServiciosId = dto.serviciosId

            };
            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("NewPutQuote/{id}")]

        public async Task<IActionResult> NewPutQuote(int id, UpdateQuotesDTO dto)
        {
            var existingQuote = await _context.Quotes.FindAsync(id);
            if (existingQuote == null)
            {
                return NotFound(new { msg = "Cita no encontrada" });
            }
            existingQuote.title = dto.title;
            existingQuote.quote_description = dto.quote_description;
            existingQuote.quote_date = dto.quote_date;
            existingQuote.ServiciosId = dto.serviciosId;
            await _context.SaveChangesAsync();
            return Ok();
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
